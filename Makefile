PUBDIR=public
BUILDDIR=public/bundle
APP=./app
DEMO=./demo-tabs
JSAPP=./app.js
JSAPPSRC=$(wildcard app/*/*.js)
JSDEMO=./demo-tabs.js
JSDEMOSRC=$(wildcard app/*.js)


servedemo: builddemo
	@cd public && python -m SimpleHTTPServer 8080 && cd ..

builddemo: jspm $(BUILDDIR)/demo.js

build: jspm $(BUILDDIR)/app.js

buildsfx: $(BUILDDIR)/app-sfx.js

jspm: $(PUBDIR)/config.js $(PUBDIR)/jspm_packages

$(PUBDIR)/config.js: ./config.js
	cp -f $< $@

$(PUBDIR)/jspm_packages: ./jspm_packages
	@mkdir -p $@
	cp -f ./jspm_packages/es6-module-loader* $@/
	cp -f ./jspm_packages/system* $@/

$(BUILDDIR)/app.js: $(JSAPP) $(JSAPPSRC)
	@jspm bundle $(APP) $@

$(BUILDDIR)/app-sfx.js: $(JSAPP) $(JSAPPSRC)
	@jspm bundle-sfx $(APP) $@

$(BUILDDIR)/demo.js: $(JSDEMO) $(JSDEMOSRC)
	@jspm bundle $(DEMO) $@

clean:
	@rm -f $(PUBDIR)/config.js $(BUILDDIR)/*
	@rm -fr $(PUBDIR)/jspm_packages

.PHONY: build builddemo servedemo jspm buildsfx clean
