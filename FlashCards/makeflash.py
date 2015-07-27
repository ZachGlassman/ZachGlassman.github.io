# -*- coding: utf-8 -*-
"""
File to insert the flashcards from text into JSON file and make
the LaTeX render properly.

every other line is front and back.
"""

def filter(s):
    ans = ''
    for i in s:
        if i == '\\':
            ans += '\\\\'
        else:
            ans += i
    return '"{0}"'.format(ans)
    
with open('data.txt','r') as fp:
    data_in = fp.readlines()
    
#now make output and in each row replace \ with \\
front = True
output = '['

for i in data_in:
    if front:
        output += '{"Front":'+ format(filter(i))
        front = False
    else:
        output += ',"Back":'+ format(filter(i)) + '},'
        front = True
#get rid of last comma
output = output.rstrip(',')
output += ']'
with open('data.json','w') as fp:
    fp.write(output.replace('\n',''))
print('Wrote file')