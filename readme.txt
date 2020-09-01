pasos:

1. con Filezila copiar carpeta juego-silabas (con js, audio e images adentro ) a la carpeta de plugins del tema de la pagina.
2. Activar plugin en pagina.

en js/scenes/sceneLoad: put line:
	pluginPath = wpa_data.plugin_path;
so it can load files from that path.

