
HEADER = HEADER

SRC = src/voltaire_parser.js \
			src/voltaire_advicer.js
MAIN = src/main.js

OUTPUT = VoltaireConnect/vconnect.js

.PHONY: all prepare webext webext-min

all: webext

clean:
	rm -rf export
	rm -rf VoltaireConnect/popup/
	rm -f ${OUTPUT}

prepare:
	mkdir -p export

	mkdir -p VoltaireConnect/popup/
	cp src/popup/* VoltaireConnect/popup/

webext: clean prepare
	cat ${HEADER} ${SRC} ${MAIN} >> ${OUTPUT}
	cd VoltaireConnect;zip -r ../export/VoltaireConnect.zip *

webext-min: clean prepare
	terser ${SRC} ${MAIN} -o ${OUTPUT}.tmp -c -m
	cat ${HEADER} ${OUTPUT}.tmp >> $(OUTPUT)
	rm -f ${OUTPUT}.tmp
	cd VoltaireConnect;zip -r ../export/VoltaireConnect.zip *
