for dir in ./src/workExamples/*/; do
  mkdir -p "./src/res/workExamples/$(basename "$dir")"
  for file in $dir/*.ts; do 
    cp "$file" "./src/res/workExamples/$(basename "$dir")/$(basename "$file" .ts).txt";
  done
done
