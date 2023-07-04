## Notes

### First resubmission (answers to Victoria Wimmer)

> Please proof-read your description text. Currently it reads: "...use 'Firebase Storage' to ..." -> Should probably begin with a capital "U" since it is a new sentence

Thanks, changed in the DESCRIPTION file.


> Please add \value to .Rd files regarding exported methods and explain the functions results in the documentation. Please write about the structure of the output (class) and also what the output means. (If a function does not return a value, please document that too, e.g. \value{No return value, called for side effects} or similar)
    Missing Rd-tags in up to 15 .Rd files, e.g.:
        Analytics.Rd: \value
        dependencies.Rd: \value
        Firebase.Rd: \value
        FirebaseAuth.Rd: \value
        FirebaseEmailLink.Rd: \value
        FirebaseEmailPassword.Rd: \value
        ...


> We added the \value to all the .Rd files regarding exported methods



> Unexecutable code in man/Storage.Rd:
  observeEvent(s$get_response() {

Missing comma indeed ! Fixed it.

> Functions which are supposed to only run interactively (e.g. shiny) should be wrapped in if(interactive()).
Please replace /dontrun{} with if(interactive()){} if possible, then users can see that the functions are not intended for use in scripts / functions that are supposed to run non interactively. \dontrun{} should only be used if the example really cannot be executed (e.g. because of missing additional software, missing API keys, ...) by the user. That's why wrapping examples in \dontrun{} adds the comment ("# Not run:") as a warning for the user.

Indeed we wrapped it (and the other ones) in \dontrun{} in purpose because of missing API keys required from Firebase.


> Please always make sure to reset to user's options(), working directory or par() after you changed it in examples and vignettes and demos. --> man/FirebaseEmailLink.Rd. e.g.: 
    old <- options(digits = 3)
    ...
    options(old)

Fixed it in FirebaseEmailLink.Rd which was the only example requiring this change.


> Additionally: Have the issues why your package was archived been fixed?

Yes, I talked with the past maintainer and they have been fixed but not resubmitted because of lack of time.
Thanks for your time and feedback !


## Test environments
- R-hub windows-x86_64-devel (r-devel)
- R-hub ubuntu-gcc-release (r-release)
- R-hub fedora-clang-devel (r-devel)

## R CMD check results

❯ On windows-x86_64-devel (r-devel)
  checking CRAN incoming feasibility ... [16s] NOTE

  New maintainer:
    David Munoz Tord <david.munoztord@mailbox.org>
  Old maintainer(s):
    John Coene <jcoenep@gmail.com>
  Maintainer: 'David Munoz Tord <david.munoztord@mailbox.org>'

❯ On ubuntu-gcc-release (r-release)
  checking CRAN incoming feasibility ... [8s/32s] NOTE
  Maintainer: ‘David Munoz Tord <david.munoztord@mailbox.org>’

  New maintainer:
    David Munoz Tord <david.munoztord@mailbox.org>
  Old maintainer(s):
    John Coene <jcoenep@gmail.com>

❯ On ubuntu-gcc-release (r-release), fedora-clang-devel (r-devel)
  checking HTML version of manual ... NOTE
  Skipping checking HTML validation: no command 'tidy' found

❯ On fedora-clang-devel (r-devel)
  checking CRAN incoming feasibility ... [12s/39s] NOTE
  Maintainer: ‘David Munoz Tord <david.munoztord@mailbox.org>’

  New maintainer:
    David Munoz Tord <david.munoztord@mailbox.org>
  Old maintainer(s):
    John Coene <jcoenep@gmail.com>

0 error ✖ | 0 warnings ✔ | 3 notes ✖