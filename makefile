
HEADER = HEADER

SRC = src/voltaire_parser.js \
      src/language_tool.js \
      src/string_utils.js \
      src/voltaire_Tree.js

OUTPUT = VoltaireConnect/vconnect.js

.PHONY: all prepare webext webext-min

all: webext

clean:
	$(RM) -rf export
	$(RM) -rf VoltaireConnect/popup/
	$(RM) -f ${OUTPUT}.map
	$(RM) -f ${OUTPUT}

prepare:
	mkdir -p export

	mkdir -p VoltaireConnect/popup/
	cp src/popup/* VoltaireConnect/popup/

ts:
	tsc --outFile ${OUTPUT}

webext: clean prepare ts
	cd VoltaireConnect;zip -r ../export/VoltaireConnect.zip *

webext-min: clean prepare ts
	terser ${OUTPUT} -o ${OUTPUT}.tmp -c -m
	rm -f ${OUTPUT}
	cat ${HEADER} ${OUTPUT}.tmp > $(OUTPUT)
	rm -f ${OUTPUT}.tmp
	cd VoltaireConnect;zip -r ../export/VoltaireConnect.zip *
