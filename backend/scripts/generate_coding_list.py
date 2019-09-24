import os
import json

BASE_DATA_DIR = '../data/'

result = []
# loop over file names and append to array of data coding objects
for filename in os.listdir(os.path.join(BASE_DATA_DIR, 'raw_audio')):
    if filename.endswith(".wav"):
        result.append({
            'filename': filename,
            'code': ''
        })
        continue
    else:
        continue

# save to json object
with open(os.path.join(BASE_DATA_DIR, 'coding_data.json'), 'w') as outfile:
    json.dump(result, outfile)

print('Generated array of coding files and saved to disk')
