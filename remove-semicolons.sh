#!/bin/bash

# Trouver tous les fichiers .js et .jsx dans le dossier frontend/src
find frontend/src -type f \( -name "*.js" -o -name "*.jsx" \) -print0 | while IFS= read -r -d '' file; do
    # Supprimer les points-virgules en fin de ligne
    sed -i '' 's/;$//g' "$file"
    # Supprimer les points-virgules suivis d'un espace ou d'une nouvelle ligne
    sed -i '' 's/; /\ /g' "$file"
    sed -i '' 's/;\n/\n/g' "$file"
done
