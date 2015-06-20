# -*- coding: utf-8 -*-

from bokeh.io import vform
from bokeh.models import Callback, ColumnDataSource, Slider
from bokeh.plotting import figure, output_file, save, gridplot
from bokeh.embed import components
from bokeh.resources import CDN
import numpy as np
output_file("RiemannSums.html", "Riemmann Sums",mode = 'cdn')

def myfunc(x):
    return np.sin(x) + x/8
    
x = np.linspace(-20,20,10000)
y = myfunc(x)
#plot square, remember center is at point
val = .5
square_xL = np.arange(0,3 * np.pi,.5)
square_yL = myfunc(square_xL)
square_xR = np.arange(3 * np.pi,0,-.5)
square_yR = myfunc(square_xR)

#now generate data for last plot
dxx = np.linspace(.05,1,100)
data_R = np.zeros(len(dxx))
data_L = np.zeros(len(dxx))
data_real = np.zeros(len(dxx))
for ind,i in enumerate(dxx):
    xL = np.arange(0,3 * np.pi,i)
    xR = np.arange(3 * np.pi,0,-i)
    yL = myfunc(xL)
    yR = myfunc(xR)
    sumL = sum([i * j for j in yL])
    sumR = sum([i * j for j in yR])
    data_R[ind] = sumR
    data_L[ind] = sumL
    data_real[ind] = 2 + 9 * np.pi**2/16



source = ColumnDataSource(data=dict(leftL = square_xL,
                                    topL =square_yL,
                                    rightL = square_xL + val,
                                    leftR = square_xR - val,
                                    topR =square_yR,
                                    rightR = square_xR,
                                    bottom = np.zeros(len(square_xL)),
                                    dx = val
                                    ))

#setupt plots

plot = figure(y_range=(-1.5, 2.5),title = "Both",
              x_range=(-.1,10), plot_width=350, plot_height=200)
plotL = figure(y_range=(-1.5, 2.5),title = "Left Sums",
               x_range=(-.1,10), plot_width=350, plot_height=200)
plotR = figure(y_range=(-1.5, 2.5),title = "Right Sums",
               x_range=(-.1,10), plot_width=350, plot_height=200)
plotSum = figure(y_range=(6.5, 8.2),title = "Compare Sums",
               x_range=(0,1), plot_width=350, plot_height=200)
                
                
plot.toolbar_location = None
plotL.toolbar_location = None
plotR.toolbar_location = None
plotSum.toolbar_location = None
#plot initial things
#sin wave
plot.line(x, y, line_width=3, line_alpha=0.5)
plotL.line(x, y, line_width=3, line_alpha=0.5)
plotR.line(x, y, line_width=3, line_alpha=0.5)
plotSum.multi_line([dxx,dxx,dxx],[data_L,data_R,data_real],
                   color = ['red','blue','green'])

#source = source
#change so its one function to plot with numpy arrays or something!!

plot.quad(bottom = 'bottom',
          top = 'topL',
          left = 'leftL',
          right = 'rightL',
          source = source,
          color = "red",
          alpha = 0.25)

plotL.quad(bottom = 'bottom',
          top = 'topL',
          left = 'leftL',
          right = 'rightL',
          source = source,
          color = "red",
          alpha = 0.25)

plotR.quad(bottom = 'bottom',
          top = 'topR',
          left = 'leftR',
          right = 'rightR',
          source = source,
          color = "blue",
          alpha = 0.25)
          
plot.quad(bottom = 'bottom',
          top = 'topR',
          left = 'leftR',
          right = 'rightR',
          source = source,
          color = "blue",
          alpha = 0.25)





#callback for slider
callback = Callback(args=dict(source=source), code="""
    function myfunc(x){
    return Math.sin(x) + x/8
    };
    var data = source.get('data');
    var dx = cb_obj.get('value');
    data['dx'] = dx;
    data['topL'] = [];
    data['bottom'] = [];
    data['leftL'] = [];
    data['rightL'] = [];
    data['topR'] = [];
    data['leftR'] = [];
    data['rightR'] = [];
    var x_val = 0;
    var end = 3 * Math.PI;
    var num_pts = end/dx;
    for (i = 0; i < num_pts; i++) {
        data['leftL'].push(x_val);
        data['topL'].push(myfunc(x_val));
        data['bottom'].push(0);
        data['rightL'].push(x_val + dx);
        x_val = x_val + dx;
    }
    
    for (i = 0; i < num_pts; i++) {
        data['leftR'].push(end - dx);
        data['topR'].push(myfunc(end));
        data['rightR'].push(end);
        end = end - dx;
        }
    
    
    source.trigger('change');
"""    )

slider = Slider(start=.01, end=1, value=val, step=.05,
                title="dx", callback=callback)
 
grid = gridplot([[plotL,plotR],[plot,plotSum]])
grid.toolbar_location = None
layout = vform(slider,grid)

save(layout)

script, div = components(layout, CDN)
with open('Riemann.js','w') as f:
    f.write(script)

with open('tag.txt','w') as f:
    f.write(div)
