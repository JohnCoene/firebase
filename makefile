default:
	Rscript -e "packer::bundle()"
	Rscript -e "devtools::document()"
