import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/nestjs';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  /**
   * Exception handling and Sentry integration
   */
  catch(exception: unknown, host: ArgumentsHost) {
    try {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest();

      // Use Sentry's withScope for scoped error handling
      void Sentry.withScope(async (scope) => {
        this.enrichScope(scope, request, exception);
        Sentry.captureException(exception);

        // Flush events to ensure they are sent to Sentry
        try {
          await Sentry.flush(2000);
        } catch (flushError) {
          console.error('Error flushing Sentry event:', flushError);
        }
      });
    } catch (sentryError) {
      console.error('Error reporting to Sentry:', sentryError);
    }

    // Proceed with NestJS's default exception handling
    super.catch(exception, host);
  }

  /**
   * Enrich the Sentry scope with request and error details
   */
  private enrichScope(scope: Sentry.Scope, request: any, exception: any): void {
    if (request) {
      // Add request details
      scope.setContext('Request Details', {
        url: request.url,
        method: request.method,
        headers: this.sanitizeHeaders(request.headers),
        body: request.body,
        query: request.query,
        params: request.params,
      });

      // Add user details if available
      if (request.user) {
        scope.setUser({
          id: request.user.id,
          sessionId: request.user.sessionId,
        });
      }

      // Add transaction tag
      scope.setTag(
        'transaction',
        `${request.method} ${request.route?.path || request.url}`,
      );
    }

    let errors: any = {};
    let title: string = '';
    let stack: any = '';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      // Determine error status and set error level
      status = exception.getStatus();

      const responseObj = exception.getResponse() as any;
      errors = responseObj.errors || responseObj.error || {};
      if (
        typeof responseObj.errors === 'object' &&
        Object.keys(responseObj.errors).length > 0
      ) {
        title = Object.values(errors).join(',');
      } else {
        title = responseObj.error;
      }
      stack = responseObj.stack;
    }

    scope.setLevel(status >= 500 ? 'error' : 'warning');

    // Add error details to the scope
    scope.setContext('Error Details', {
      name: exception.name || 'UnknownError',
      message: exception.message || 'An unknown error occurred',
      errors,
      stack: stack || exception.stack || 'No stack trace available',
      status,
      timestamp: new Date().toISOString(),
    });

    // Add error-related tags
    scope.setTag(
      'error.type',
      exception instanceof HttpException ? 'handled' : 'unhandled',
    );
    scope.setTag('error.status', status.toString());

    exception.name = title;
  }

  /**
   * Sanitize headers to redact sensitive information
   */
  private sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers };
    ['authorization', 'cookie'].forEach((key) => {
      if (sanitized[key]) {
        sanitized[key] = '[REDACTED]';
      }
    });
    return sanitized;
  }
}
