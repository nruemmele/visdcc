# Visdcc
Dash Core Components for Visualization.

- [Installing](#installing-)
- [Build componet](#build)
- [Requirements](#requirements)
- [Usage](#usage-)
  - [visdcc.Network](#1-visdccnetwork-)
    - [Plot basic network](#plot-basic-network-)
    - [Get selected nodes and edges](#get-selected-nodes-and-edges-)
    - [Animate or move the camera](#animate-or-move-the-camera-)
  - [visdcc.DataTable](#2-visdccdatatable-)
    - [Plot basic table and get selected cell](#plot-basic-table-and-get-selected-cell-)
- [Learning more about dash ...](#dash)  

# Build
```
npm run build:js
```

Rename `visdcc.min.js` in the folder [visdcc](visdcc/) to `bundle.js`.
Then install as a main python library.

# Installing :
The official version from `pypi` can be installed via:
```
pip install visdcc
```

The new version:
```pip install .```

# Requirements：

* **dash** -- The core dash backend
* **dash-renderer** -- The dash front-end
* **dash-html-components** -- HTML components
* **dash-core-components** -- Supercharged components

[↑](#visdcc)
# Usage :
```
import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output, Event, State
import visdcc

app = dash.Dash()
app.layout = html.Div(...)

@app.callback(...)
def myfun(...):
    ...
    return ...

if __name__ == '__main__':
    app.run_server()
```
[↑](#visdcc)
# 1. visdcc.Network : 
See documents of vis.js : http://visjs.org/docs/network/

CSS : https://cdnjs.cloudflare.com/ajax/libs/vis/4.20.1/vis.min.css

[↑](#visdcc)
### Plot basic network :
```
app.layout = html.Div([
      visdcc.Network(id = 'net', 
                     options = dict(height= '600px', width= '100%')),
      dcc.Input(id = 'label',
                placeholder = 'Enter a label ...',
                type = 'text',
                value = ''  ),
      html.Br(),html.Br(),
      dcc.RadioItems(id = 'color',
                     options=[{'label': 'Red'  , 'value': '#ff0000'},
                              {'label': 'Green', 'value': '#00ff00'},
                              {'label': 'Blue' , 'value': '#0000ff'} ],
                     value='Red'  )             
])

@app.callback(
    Output('net', 'data'),
    [Input('label', 'value')])
def myfun(x):
    data ={'nodes':[{'id': 1, 'label':    x    , 'color':'#00ffff'},
                    {'id': 2, 'label': 'Node 2'},
                    {'id': 4, 'label': 'Node 4'},
                    {'id': 5, 'label': 'Node 5'},
                    {'id': 6, 'label': 'Node 6'}                    ],
           'edges':[{'id':'1-3', 'from': 1, 'to': 3},
                    {'id':'1-2', 'from': 1, 'to': 2} ]
           }
    return data

@app.callback(
    Output('net', 'options'),
    [Input('color', 'value')])
def myfun(x):
    return {'nodes':{'color': x}}
```
[↑](#visdcc)
### Get selected nodes and edges :

```
app.layout = html.Div([
      visdcc.Network(id = 'net',
                     selection = {'nodes':[], 'edges':[]},
                     options = dict(height= '600px', width= '100%')),
      html.Div(id = 'nodes'),
      html.Div(id = 'edges')
])
      
@app.callback(
    Output('nodes', 'children'),
    [Input('net', 'selection')])
def myfun(x): 
    s = 'Selected nodes : '
    if len(x['nodes']) > 0 : s += str(x['nodes'][0])
    return s

@app.callback(
    Output('edges', 'children'),
    [Input('net', 'selection')])
def myfun(x): 
    s = 'Selected edges : '
    if len(x['edges']) > 0 : s = [s] + [html.Div(i) for i in x['edges']]
    return s
```
[↑](#visdcc)
### Animate or move the camera :

```
app.layout = html.Div([
      visdcc.Network(id = 'net', 
                     options = dict(height= '600px', width= '100%')),
      dcc.Input(id = 'label',
                placeholder = 'Enter a scale ...',
                type = 'text',
                value = ''  ),
      dcc.Input(id = 'labelx',
                placeholder = 'Enter x position ...',
                type = 'text',
                value = ''  ),    
      dcc.Input(id = 'labely',
                placeholder = 'Enter y position ...',
                type = 'text',
                value = ''  ), 
      dcc.Input(id = 'node',
                placeholder = 'Enter node id ...',
                type = 'text',
                value = ''  )              
])

@app.callback(
    Output('net', 'moveTo'),
    [Input('label', 'value'),
     Input('labelx', 'value'),
     Input('labely', 'value')])
def myfun(z, x, y):
    if z == '': z = 1
    if x == '': x = 1
    if y == '': y = 1
    return {'position': {'x': int(x), 'y': int(y)}, 'scale': int(z)}

@app.callback(
    Output('net', 'fit'),
    [Input('node', 'value')])
def myfun(x):
    if x == '': return({'Is_used': False})
    else: return({'nodes': [x], 'animation': True})
```
[↑](#visdcc)
# 2. visdcc.DataTable : 
See documents of antd.js : https://ant.design/components/table/
  - Using regular expression to filter the string.
  - Using boolean expression like `x > 20 & x < 70` to filter the number.

CSS : 
  - https://unpkg.com/antd@3.1.1/dist/antd.css
  - https://rawgit.com/jimmybow/CSS/master/visdcc/DataTable/Filter.css

[↑](#visdcc)
### Plot basic table and get selected cell :
```
DF_SAMPLE = {'dataSource':[{'key': 1, 'name': 'Jacky', 'age': 20},
                           {'key': 2, 'name': 'Mei'  , 'age': 18},
                           {'key': 3, 'name': 'Jay', 'age': 72},
                           {'key': 4, 'name': 'Sandy'  , 'age': 14},
                           {'key': 5, 'name': 'Jerry', 'age': 56},
                           {'key': 6, 'name': 'May'  , 'age': 22},
                           {'key': 7, 'name': 'Jimmy', 'age': 34},
                           {'key': 8, 'name': 'Jeff'  , 'age': 28},
                           {'key': 9, 'name': 'Bob', 'age': 15} ],
             'columns':[{'title': 'Names',
                         'dataIndex': 'name',
                         'key': 'name',
                         'Is_sort': True, 
                         'Is_click': True    },
			{'title': 'Ages',
                         'dataIndex': 'age',
                         'key': 'age',
                         'Is_sort': True,
                         'Is_click': True    }]
             }
          
app.config['suppress_callback_exceptions'] = True

app.layout = html.Div([
    html.Link(href='https://unpkg.com/antd@3.1.1/dist/antd.css', rel='stylesheet'), 
    html.Link(href='https://rawgit.com/jimmybow/CSS/master/visdcc/DataTable/Filter.css', rel='stylesheet'), 
    visdcc.DataTable(id         = 'table' ,
                     box_type   = 'radio',
                     data       = DF_SAMPLE,
                     scroll     = {'y':200},
                     pagination = {'pageSize': 5},
                     style      = {'width':'50%'}  ),
    html.Div(id = 'text1'),                 
    html.Div(id = 'text2'),
    html.Div(id = 'text3'),
    html.Div(id = 'text4'),
    html.Div(id = 'text5')
])
           
@app.callback(
    Output('text1', 'children'),
    [Input('table', 'box_selected_keys')])
def myfun(x): 
    if x == None  : return('')
    else          : return("Selected row key is " + ', '.join([str(i) for i in x])  )
    
@app.callback(
    Output('text2', 'children'),
    [Input('table', 'selectedcell')])
def myfun(x): 
    if x == None  : return('')
    else          : return('Clicked cell is on row : {} col : {}'.format(x['row'], x['col'])  )    

@app.callback(
    Output('text3', 'children'),
    [Input('table', 'row_filtered')])
def myfun(x): 
    if x == None  : return('')
    else          : return("row_filtered are " + str(x) ) 
    
@app.callback(
    Output('text4', 'children'),
    [Input('table', 'col_filtered')])
def myfun(x): 
    if x == None  : return('')
    else          : return("col_filtered are " + str(x) )     
    
@app.callback(
    Output('text5', 'children'),
    [Input('table', 'searchText')])
def myfun(x): 
    if x == None  : return('')
    else          : return("searchText are " + str(x) )       

```
[↑](#visdcc)
## Dash
Go to this link to learn about [Dash](https://plot.ly/dash/).
