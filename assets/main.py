from PIL import Image
import numpy as np

img=Image.open(r"assets/ダウンロード.png")
img16=img.resize((32,32))
img48=img.resize((48,48))
img128=img.resize((128,128))

img48.save(r"assets/icon48.png")
img16.save(r"assets/icon32.png")
img48.save(r"assets/icon.ico")
img48.save(r"assets/icon128.png")