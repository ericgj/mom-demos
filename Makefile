BUILDDIR=public
APP=./app
JSAPP=./app.js
JSAPPSRC=$(wildcard app/*/*.js)

build: jspm $(BUILDDIR)/app-bundle.js

buildsfx: $(BUILDDIR)/app-bundle-sfx.js

jspm: $(BUILDDIR)/config.js $(BUILDDIR)/jspm_packages

$(BUILDDIR)/config.js: ./config.js
	@cp -f $< $@

$(BUILDDIR)/jspm_packages: ./jspm_packages
	@mkdir -p $@
	@cp -f ./jspm_packages/es6-module-loader* $@/
	@cp -f ./jspm_packages/system* $@/

$(BUILDDIR)/app-bundle.js: $(JSAPP) $(JSAPPSRC)
	@jspm bundle $(APP) $@

$(BUILDDIR)/app-bundle-sfx.js: $(JSAPP) $(JSAPPSRC)
	@jspm bundle-sfx $(APP) $@

clean:
	@rm -f $(BUILDDIR)/config.js $(BUILDDIR)/app-bundle*
	@rm -fr $(BUILDDIR)/jspm_packages

.PHONY: build jspm buildsfx clean
