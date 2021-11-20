check: site
	Rscript -e "devtools::check()"

site: document
	Rscript docs/docify.R
	mkdocs build

document: bundle
	Rscript -e "devtools::document()"

bundle:
	Rscript -e "packer::bundle()"
