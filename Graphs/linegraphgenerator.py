# -*- coding: utf-8 -*-

from bokeh.io import vform
from bokeh.models import Callback, ColumnDataSource, Slider
from bokeh.plotting import figure, output_file, save
from bokeh.embed import components
from bokeh.resources import CDN
import numpy as np

output_file("LineGraph.html", "Line Graph")

slope = 1
x = np.arange(-100,101,1)
y = slope * x
a = -5
b = 5
py = [[0,0,a],[0,0,b]]
px = [[0,a,a],[0,b,b]]
color = ['red','blue']
area = ['Area is: ' + str(b*b*slope/2 - a*a*slope/2)]
#first is left, then right
source = ColumnDataSource(data=dict(x=x,y=y,px=px,py=py,col=color,a=a,b=b,slope = slope, area = area))
#setupt plots
plot = figure(y_range=(-12, 12),title = 'Line Area', x_range=(-12,12), plot_width=750, plot_height=400)

plot.toolbar_location = None

#plot initial things

plot.patches(xs='px', ys='py', color='col',source=source)

plot.line('x', 'y',source=source, line_width=3, line_alpha=1,color = 'orange')
plot.text(x=-2,y=10,text='area', source=source)
plot.xaxis.axis_label = 'x'
plot.yaxis.axis_label = 'y'


#callback for slider
callback = Callback(args=dict(source=source), code="""
    var data = source.get('data');
    var slope = cb_obj.get('value');
    data['slope'] = slope;
    x = data['x'];
    y = data['y'];
    a = data['a'];
    b = data['b'];
    col = data['col'];
    for(i = 0; i < x.length; i++){
        y[i] = slope * x[i];
    };
    var ly = slope * a;
    var ry = slope * b;
    if (ly > 0.0){
        col[0] = 'blue';
        col[1] = 'red';
    }else{
        col[1] = 'blue';
        col[0] = 'red';
    };
    
    data['py'] = [[0,0,ly],[0,0,ry]];
    
    var area = b*b*slope/2-a*a*slope/2;
    area = ['Area is: ' + area.toFixed(3)];
    data['area'] = area;
    source.trigger('change');
"""    )

callbacka = Callback(args=dict(source=source), code="""
    var data = source.get('data');
    var a = cb_obj.get('value');
    data['a'] = a
    data['x'] = [];
    data['y'] = [];
    b = data['b'];
    slope = data['slope'];
    col = data['col'];
    var p = a;
    var dx = (b-a)/100;
    for(i = 0; i < 100; i++){
        data['x'].push(p)
        data['y'].push(slope * p);
        p = p +dx;
    };
    var ly = slope * a;
    var ry = slope * b;
    data['px'] = [[0,a,a],[0,b,b]];
    data['py'] = [[0,0,ly],[0,0,ry]];
    
    var area = b*b*slope/2-a*a*slope/2;
    area = ['Area is: ' + area.toFixed(3)];
    data['area'] = area;
    
    source.trigger('change');
"""    )

callbackb = Callback(args=dict(source=source), code="""
    var data = source.get('data');
    var b = cb_obj.get('value');
    data['b'] = b
    data['x'] = [];
    data['y'] = [];
    a = data['a'];
    slope = data['slope'];
    col = data['col'];
    var p = a;
    var dx = (b-a)/100;
    for(i = 0; i < 100; i++){
        data['x'].push(p)
        data['y'].push(slope * p);
        p = p +dx;
    };
    var ly = slope * a;
    var ry = slope * b;
    data['px'] = [[0,a,a],[0,b,b]];
    data['py'] = [[0,0,ly],[0,0,ry]];
    
    var area = b*b*slope/2-a*a*slope/2;
    area = ['Area is: ' + area.toFixed(3)];
    data['area'] = area;
    
    source.trigger('change');
"""    )

slidera = Slider(start=-10, end=1, value=-5, step=.1,
                title="a", callback=callbacka)
sliderb = Slider(start=1, end=10, value=5, step=.1,
                title="b", callback=callbackb)

slider = Slider(start=-5, end=5, value=1, step=.1,
                title="Slope", callback=callback)

layout = vform(slidera,sliderb,slider,plot)
save(layout)

script, div = components(layout, CDN)

with open('lineplotab.js','w') as f:
    f.write(script)

#now fix for what we want

with open('lineplotab.js','r') as f:
    in_data = f.readlines()

with open('lineplotab.js','w') as f:
    for i in in_data[1:-1]:
        f.write(i)

with open('tag.txt','w') as f:
    f.write(div)
