BUILD=public/build

prod: $(BUILD)/app-bundle-sfx.js

debug: $(BUILD)/app-bundle.js

$(BUILD)/app-bundle.js:
	@jspm bundle ./app $@

$(BUILD)/app-bundle-sfx.js:
	@jspm bundle-sfx ./app $@

clean:
	@rm -f $(BUILD)/*

.PHONY: prod debug clean
