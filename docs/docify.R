news <- readLines("NEWS.md")
news <- gsub("#", "##", news)
writeLines(news, "docs/misc/changelog.md")

fs::file_copy("LICENSE.md", "docs/misc/license.md", overwrite = TRUE)
fs::file_copy("CODE_OF_CONDUCT.md", "docs/misc/coc.md", overwrite = TRUE)
