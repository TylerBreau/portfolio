for dir in ./src/workExamples/*/; do
  mkdir -p "./src/res/workExamples/$(basename "$dir")"
  for file in $dir*; do 
    cp "$file" "./src/res/workExamples/$(basename "$dir")/$(basename "${file%.*}").txt";
  done
done
