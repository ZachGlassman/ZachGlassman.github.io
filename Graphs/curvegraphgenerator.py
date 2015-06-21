# -*- coding: utf-8 -*-

from bokeh.io import vform
from bokeh.models import Callback, ColumnDataSource, Slider
from bokeh.plotting import figure, output_file, save
from bokeh.embed import components
from bokeh.resources import CDN
import numpy as np

output_file("SinGraph.html", "Line Graph")
def myfunc(x):
    return np.sin(x) + x/8
    
x = np.linspace(-20,20,100)
y = myfunc(x)

plot = figure(y_range=(-5, 5),title = 'sin(x) + x/8', x_range=(-1,10), plot_width=750, plot_height=400)

plot.toolbar_location = None


plot.line(x, y, line_width=3, line_alpha=1,color = 'orange')
plot.xaxis.axis_label = 'x'
plot.yaxis.axis_label = 'f(x)'




layout = vform(plot)
save(layout)

script, div = components(layout, CDN)

with open('sinplot.js','w') as f:
    f.write(script)

#now fix for what we want

with open('sinplot.js','r') as f:
    in_data = f.readlines()

with open('sinplot.js','w') as f:
    for i in in_data[1:-1]:
        f.write(i)

with open('tag.txt','w') as f:
    f.write(div)
