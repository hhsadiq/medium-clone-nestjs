---
sh: |
  <% if (version === 'v2') { %>
    # Define source and target directories
    source_dir="<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/entities"
    target_dir="<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/infrastructure/persistence/relational/entities"

    # Ensure the target directory structure exists
    mkdir -p "$target_dir"

    # Copy contents from source to target
    cp -r "$source_dir"/* "$target_dir"

    # Change to target directory for renaming
    cd "$target_dir"
        for file in *.entity.ts; do
      new_name="${file%.entity.ts}.v2.entity.ts"
      echo "Renaming $file to $new_name"
      mv "$file" "$new_name"

      # Update class names by adding 'V2' suffix
      sed -i "s/\(export class \)\([A-Za-z0-9_]*\)/\1\2V2/" "$new_name"
    done

  <% } else { %>
    # Copy entity folder from previous version

    source_dir="<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= 'v' + (parseInt(version.slice(1)) - 1) %>/infrastructure/persistence/relational/entities"
    target_dir="<%= cwd %>/src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/<%= version %>/infrastructure/persistence/relational/entities"

    # Ensure target directory structure exists
    mkdir -p "$target_dir"

    # Copy contents from source to target
    cp -r "$source_dir"/* "$target_dir"

    # Change to target directory for renaming
    cd "$target_dir"
    for file in *.entity.ts; do
      new_name="${file%.v<%= parseInt(version.slice(1)) - 1 %>.entity.ts}.<%= version %>.entity.ts"
      echo "Renaming $file to $new_name"
      mv "$file" "$new_name"

      # Replace the old version suffix in class names with the new version
      sed -i "s/\(export class \)\([A-Za-z0-9_]*\)V<%= parseInt(version.slice(1)) - 1 %>/\1\2<%= version.toUpperCase() %>/" "$new_name"
    done
  <% } %>
---
