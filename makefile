default:
	Rscript -e "packer::bundle()"
	Rscript -e "devtools::document()"
	Rscript -e "devtools::check()"
	mkdocs build
