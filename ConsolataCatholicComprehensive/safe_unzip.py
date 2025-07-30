import zipfile
import sys

try:
    with zipfile.ZipFile('skulicheck.zip') as z:
        z.extractall()
    print("Extraction successful!")
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
