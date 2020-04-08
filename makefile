
SRC = src/main.js
OUTPUT = VoltaireConnect/vconnect.js

all: webext

clean:
	rm -rf export
	rm -f ${OUTPUT}

webext: clean
	mkdir -p export
	
	cat ${SRC} >> ${OUTPUT}
	cd VoltaireConnect;zip -r ../export/VoltaireConnect.zip *
