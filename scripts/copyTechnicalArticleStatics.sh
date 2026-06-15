for dir in ./src/technicalArticles/*/; do
  mkdir -p "./src/res/technicalArticles/$(basename "$dir")"
  for file in $dir*; do 
    cp "$file" "./src/res/technicalArticles/$(basename "$dir")/$(basename "${file%.*}").txt";
  done
done
