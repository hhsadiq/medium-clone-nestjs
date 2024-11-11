---
sh: |
  <% if (version === 'v2') { %>
    # Copy domain folder for v2
    cp -r "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/domain" "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/domain/"

    # Rename files for v2 (add v2 to filenames)
    cd "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/domain"
    for file in *; do
      new_name="${file%.ts}.v2.ts"
      echo "Renaming $file to $new_name"
      mv "$file" "$new_name"
      sed -i "s/\(export class \)\([A-Za-z0-9_]*\)/\1\2V2/" "$new_name"
    done
  <% } else { %>
    # Copy domain folder from previous version
    cp -r "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= 'v' + (parseInt(version.slice(1)) - 1) %>/domain" "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/domain/"

    # Rename files for current version (replace previous version suffix with current version)
    cd "<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/domain"
    for file in *; do
      new_name="${file%.v<%= parseInt(version.slice(1)) - 1 %>.ts}.<%= version %>.ts"
      echo "Renaming $file to $new_name"
      mv "$file" "$new_name"
      sed -i "s/\(export class \)\([A-Za-z0-9_]*\)V<%= parseInt(version.slice(1)) - 1 %>/\1\2<%= version.toUpperCase() %>/" "$new_name"
    done
  <% } %>
---
