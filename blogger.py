# -*- coding: utf-8 -*-
"""
File to insert my blog posts into my angular javascript in the correct order
assume they are numbered and simply html files
with:
line1 = title
line2 = date
rest = content
"""
import os
path = os.getcwd()
#change directorys in system indepdendant way
os.chdir('partials')
os.chdir('POSTS')
#get all the files
files = os.listdir()
#now for each file, get content and put into dictionary indexed
#by number so we can sort if we want
blogC = {}
high_num = 0
content = {} #need to handle content seperately
for file in files:
    num = int(file.rstrip('.html'))
    high_num = max(num,high_num)
    blogC[num] = {}
    with open(file,'r') as fp:
        data = fp.readlines()
        blogC[num]['name'] = data[0].rstrip('\n')
        blogC[num]['date'] = data[1].rstrip('\n')
        blogC[num]['content'] = ''.join(i for i in data[2:])
        #content[num] =  ''.join(i.rstrip('\n') for i in data[2:])

#now insert into js file as json
os.chdir(path)
os.chdir('js')
# we will read in the javascript, then edit it and copy
with open('main.js','r') as fp:
    data = fp.readlines()
#we have marked javascript where we want to replace it
indEnd = data.index('//end replace\n')
indStart = data.index('//begin replace\n')
#now write it all to file
with open('main.js','w') as fp:
    for i in data[:indStart+1]:
        fp.write(i)
    for i in range(high_num,-1,-1):
        fp.write(blogC[i].__str__() + ',\n')
        '''
        outstr = blogC[i].__str__()[:-1]
        outstr += ','+ 'content'.__repr__() + ':'
        outstr +=  '$scope.s' + str(i)+' = $sce.trustAsHtml('+content[i].__repr__() + ')}'
        fp.write('    ' + outstr+ ',\n')
        '''
    for i in data[indEnd:]:
        fp.write(i)
        
print('File Written')