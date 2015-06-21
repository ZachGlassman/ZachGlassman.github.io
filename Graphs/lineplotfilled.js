    Bokeh.$(function() {
        var modelid = "2720b666-b528-4f0d-8a2d-ef00637ecdda";
        var modeltype = "VBoxForm";
        var elementid = "7cc2bbe7-dc2b-4d93-894b-3bf2501bcb6f";
        Bokeh.logger.info("Realizing plot:")
        Bokeh.logger.info(" - modeltype: VBoxForm");
        Bokeh.logger.info(" - modelid: 2720b666-b528-4f0d-8a2d-ef00637ecdda");
        Bokeh.logger.info(" - elementid: 7cc2bbe7-dc2b-4d93-894b-3bf2501bcb6f");
        var all_models = [{"type": "PreviewSaveTool", "id": "bc775c5c-01bd-4cb5-b472-2e177b21d5c8", "attributes": {"id": "bc775c5c-01bd-4cb5-b472-2e177b21d5c8", "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}}}, {"type": "GlyphRenderer", "id": "1903e66d-6eff-4530-87d0-5886feb42a57", "attributes": {"glyph": {"type": "Patches", "id": "5ff52344-d58c-439f-9e9f-b6ee56566e1b"}, "id": "1903e66d-6eff-4530-87d0-5886feb42a57", "name": null, "doc": null, "tags": [], "selection_glyph": null, "nonselection_glyph": {"type": "Patches", "id": "f9ead66f-a173-4e94-88d4-157239409ee3"}, "data_source": {"type": "ColumnDataSource", "id": "badf4eb1-cbef-496d-a40b-6dc73ac4ad32"}}}, {"type": "ToolEvents", "id": "bb9dc760-4c7a-4cc4-b994-e01d918c68d4", "attributes": {"id": "bb9dc760-4c7a-4cc4-b994-e01d918c68d4", "geometries": [], "doc": null, "tags": []}}, {"type": "Range1d", "id": "7829a395-a837-4e8b-b7d1-78613cd40956", "attributes": {"id": "7829a395-a837-4e8b-b7d1-78613cd40956", "end": 8, "doc": null, "tags": [], "start": -8}}, {"type": "BasicTicker", "id": "0acea6dc-8dd7-466d-80c1-2f58768cebab", "attributes": {"tags": [], "id": "0acea6dc-8dd7-466d-80c1-2f58768cebab", "doc": null, "mantissas": [2, 5, 10], "num_minor_ticks": 5}}, {"type": "LinearAxis", "id": "e19ae566-7cdd-4ff4-a376-8fa65d5020ee", "attributes": {"formatter": {"type": "BasicTickFormatter", "id": "f3d1e1c6-7337-43bb-8410-c52b250a2976"}, "ticker": {"type": "BasicTicker", "id": "ab888579-632e-473e-867e-5e866fcb9f70"}, "axis_label": "x", "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}, "id": "e19ae566-7cdd-4ff4-a376-8fa65d5020ee"}}, {"type": "BoxZoomTool", "id": "14ecef01-c5a6-49e5-981f-c1edffdf4f35", "attributes": {"id": "14ecef01-c5a6-49e5-981f-c1edffdf4f35", "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}, "dimensions": ["width", "height"]}}, {"type": "GlyphRenderer", "id": "d7248d46-92a7-4630-8d81-fdd98bdb4016", "attributes": {"glyph": {"type": "Line", "id": "08c26dbb-f7ef-406e-8e49-69aee8666abe"}, "id": "d7248d46-92a7-4630-8d81-fdd98bdb4016", "name": null, "doc": null, "tags": [], "selection_glyph": null, "nonselection_glyph": {"type": "Line", "id": "91f0beeb-c98f-4d18-b3d3-6f56467ca7b3"}, "data_source": {"type": "ColumnDataSource", "id": "badf4eb1-cbef-496d-a40b-6dc73ac4ad32"}}}, {"type": "Line", "id": "08c26dbb-f7ef-406e-8e49-69aee8666abe", "attributes": {"doc": null, "line_width": {"value": 3}, "line_color": {"value": "orange"}, "line_alpha": {"value": 1.0}, "x": {"field": "x"}, "tags": [], "y": {"field": "y"}, "id": "08c26dbb-f7ef-406e-8e49-69aee8666abe"}}, {"type": "ResizeTool", "id": "89b9d107-1ce3-450a-a126-28f8aae9bf31", "attributes": {"id": "89b9d107-1ce3-450a-a126-28f8aae9bf31", "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}}}, {"type": "Range1d", "id": "b31f0a98-865b-4340-910e-d5214cb7f2b8", "attributes": {"id": "b31f0a98-865b-4340-910e-d5214cb7f2b8", "end": 8, "doc": null, "tags": [], "start": -8}}, {"type": "HelpTool", "id": "0025e2a2-a839-4625-be2c-47f54fa8298b", "attributes": {"id": "0025e2a2-a839-4625-be2c-47f54fa8298b", "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}}}, {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure", "attributes": {"tool_events": {"type": "ToolEvents", "id": "bb9dc760-4c7a-4cc4-b994-e01d918c68d4"}, "extra_y_ranges": {}, "x_range": {"type": "Range1d", "id": "7829a395-a837-4e8b-b7d1-78613cd40956"}, "plot_width": 750, "left": [{"type": "LinearAxis", "id": "a30a7655-ac60-4126-bd5b-3df0e2d84e38"}], "toolbar_location": null, "above": [], "renderers": [{"type": "LinearAxis", "id": "e19ae566-7cdd-4ff4-a376-8fa65d5020ee"}, {"type": "Grid", "id": "d078c17c-74c4-4ca7-8273-6d0196d32dc8"}, {"type": "LinearAxis", "id": "a30a7655-ac60-4126-bd5b-3df0e2d84e38"}, {"type": "Grid", "id": "8ee10cba-4dfd-4fde-8952-a008b5feafb3"}, {"type": "GlyphRenderer", "id": "1903e66d-6eff-4530-87d0-5886feb42a57"}, {"type": "GlyphRenderer", "id": "d7248d46-92a7-4630-8d81-fdd98bdb4016"}], "doc": null, "below": [{"type": "LinearAxis", "id": "e19ae566-7cdd-4ff4-a376-8fa65d5020ee"}], "tools": [{"type": "PanTool", "id": "e1b2eb37-6bea-41cf-81e3-ee42a5d77874"}, {"type": "WheelZoomTool", "id": "612184c0-75fb-4a10-96f0-deeefb901325"}, {"type": "BoxZoomTool", "id": "14ecef01-c5a6-49e5-981f-c1edffdf4f35"}, {"type": "PreviewSaveTool", "id": "bc775c5c-01bd-4cb5-b472-2e177b21d5c8"}, {"type": "ResizeTool", "id": "89b9d107-1ce3-450a-a126-28f8aae9bf31"}, {"type": "ResetTool", "id": "2e7447c3-5a9c-4232-9f01-96e7c6bc33dd"}, {"type": "HelpTool", "id": "0025e2a2-a839-4625-be2c-47f54fa8298b"}], "title": "Line", "y_range": {"type": "Range1d", "id": "b31f0a98-865b-4340-910e-d5214cb7f2b8"}, "tags": [], "extra_x_ranges": {}, "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "plot_height": 400, "right": []}}, {"type": "ResetTool", "id": "2e7447c3-5a9c-4232-9f01-96e7c6bc33dd", "attributes": {"id": "2e7447c3-5a9c-4232-9f01-96e7c6bc33dd", "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}}}, {"type": "Callback", "id": "527d1309-2eb1-48b5-8e10-04a8e5ce9026", "attributes": {"code": "\n    var data = source.get('data');\n    var slope = cb_obj.get('value');\n    x = data['x'];\n    y = data['y'];\n    col = data['col'];\n    for(i = 0; i < x.length; i++){\n        y[i] = slope * x[i];\n    };\n    var ly = slope * -5;\n    var ry = slope * 5;\n    if (ly > 0.0){\n        col[0] = 'blue';\n        col[1] = 'red';\n    }else{\n        col[1] = 'blue';\n        col[0] = 'red';\n    };\n    \n    data['py'] = [[0,0,ly],[0,0,ry]];\n    \n    source.trigger('change');\n", "id": "527d1309-2eb1-48b5-8e10-04a8e5ce9026", "doc": null, "tags": [], "args": {"source": {"type": "ColumnDataSource", "id": "badf4eb1-cbef-496d-a40b-6dc73ac4ad32"}}}}, {"type": "BasicTicker", "id": "ab888579-632e-473e-867e-5e866fcb9f70", "attributes": {"tags": [], "id": "ab888579-632e-473e-867e-5e866fcb9f70", "doc": null, "mantissas": [2, 5, 10], "num_minor_ticks": 5}}, {"type": "PanTool", "id": "e1b2eb37-6bea-41cf-81e3-ee42a5d77874", "attributes": {"id": "e1b2eb37-6bea-41cf-81e3-ee42a5d77874", "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}, "dimensions": ["width", "height"]}}, {"type": "ColumnDataSource", "id": "badf4eb1-cbef-496d-a40b-6dc73ac4ad32", "attributes": {"column_names": ["col", "px", "py", "y", "x"], "doc": null, "callback": null, "selected": {"0d": {"indices": [], "flag": false}, "2d": {"indices": []}, "1d": {"indices": []}}, "tags": [], "id": "badf4eb1-cbef-496d-a40b-6dc73ac4ad32", "data": {"col": ["red", "blue"], "px": [[0, -5, -5], [0, 5, 5]], "x": [-100, -99, -98, -97, -96, -95, -94, -93, -92, -91, -90, -89, -88, -87, -86, -85, -84, -83, -82, -81, -80, -79, -78, -77, -76, -75, -74, -73, -72, -71, -70, -69, -68, -67, -66, -65, -64, -63, -62, -61, -60, -59, -58, -57, -56, -55, -54, -53, -52, -51, -50, -49, -48, -47, -46, -45, -44, -43, -42, -41, -40, -39, -38, -37, -36, -35, -34, -33, -32, -31, -30, -29, -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100], "y": [-100, -99, -98, -97, -96, -95, -94, -93, -92, -91, -90, -89, -88, -87, -86, -85, -84, -83, -82, -81, -80, -79, -78, -77, -76, -75, -74, -73, -72, -71, -70, -69, -68, -67, -66, -65, -64, -63, -62, -61, -60, -59, -58, -57, -56, -55, -54, -53, -52, -51, -50, -49, -48, -47, -46, -45, -44, -43, -42, -41, -40, -39, -38, -37, -36, -35, -34, -33, -32, -31, -30, -29, -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100], "py": [[0, 0, -5], [0, 0, 5]]}}}, {"type": "Slider", "id": "f04695fa-6f67-4cf0-b407-f85914382bf2", "attributes": {"title": "Slope", "end": 5, "doc": null, "tags": [], "id": "f04695fa-6f67-4cf0-b407-f85914382bf2", "step": 0.1, "start": -5, "value": 1, "callback": {"type": "Callback", "id": "527d1309-2eb1-48b5-8e10-04a8e5ce9026"}}}, {"type": "Line", "id": "91f0beeb-c98f-4d18-b3d3-6f56467ca7b3", "attributes": {"doc": null, "line_width": {"value": 3}, "y": {"field": "y"}, "line_color": {"value": "#1f77b4"}, "line_alpha": {"value": 0.1}, "x": {"field": "x"}, "tags": [], "id": "91f0beeb-c98f-4d18-b3d3-6f56467ca7b3"}}, {"type": "Patches", "id": "f9ead66f-a173-4e94-88d4-157239409ee3", "attributes": {"doc": null, "id": "f9ead66f-a173-4e94-88d4-157239409ee3", "ys": {"field": "py"}, "line_color": {"value": "#1f77b4"}, "fill_alpha": {"value": 0.1}, "line_alpha": {"value": 0.1}, "tags": [], "fill_color": {"value": "#1f77b4"}, "xs": {"field": "px"}}}, {"type": "LinearAxis", "id": "a30a7655-ac60-4126-bd5b-3df0e2d84e38", "attributes": {"formatter": {"type": "BasicTickFormatter", "id": "e095a3b3-27a8-4c3d-923c-ad5557ba7fd5"}, "ticker": {"type": "BasicTicker", "id": "0acea6dc-8dd7-466d-80c1-2f58768cebab"}, "axis_label": "y", "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}, "id": "a30a7655-ac60-4126-bd5b-3df0e2d84e38"}}, {"type": "Grid", "id": "d078c17c-74c4-4ca7-8273-6d0196d32dc8", "attributes": {"ticker": {"type": "BasicTicker", "id": "ab888579-632e-473e-867e-5e866fcb9f70"}, "id": "d078c17c-74c4-4ca7-8273-6d0196d32dc8", "dimension": 0, "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}}}, {"type": "Grid", "id": "8ee10cba-4dfd-4fde-8952-a008b5feafb3", "attributes": {"ticker": {"type": "BasicTicker", "id": "0acea6dc-8dd7-466d-80c1-2f58768cebab"}, "id": "8ee10cba-4dfd-4fde-8952-a008b5feafb3", "dimension": 1, "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}}}, {"type": "BasicTickFormatter", "id": "e095a3b3-27a8-4c3d-923c-ad5557ba7fd5", "attributes": {"tags": [], "id": "e095a3b3-27a8-4c3d-923c-ad5557ba7fd5", "doc": null}}, {"type": "WheelZoomTool", "id": "612184c0-75fb-4a10-96f0-deeefb901325", "attributes": {"id": "612184c0-75fb-4a10-96f0-deeefb901325", "doc": null, "tags": [], "plot": {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}, "dimensions": ["width", "height"]}}, {"type": "Patches", "id": "5ff52344-d58c-439f-9e9f-b6ee56566e1b", "attributes": {"doc": null, "id": "5ff52344-d58c-439f-9e9f-b6ee56566e1b", "line_color": {"field": "col"}, "fill_alpha": {"value": 1.0}, "line_alpha": {"value": 1.0}, "tags": [], "ys": {"field": "py"}, "fill_color": {"field": "col"}, "xs": {"field": "px"}}}, {"type": "BasicTickFormatter", "id": "f3d1e1c6-7337-43bb-8410-c52b250a2976", "attributes": {"tags": [], "id": "f3d1e1c6-7337-43bb-8410-c52b250a2976", "doc": null}}, {"type": "VBoxForm", "id": "2720b666-b528-4f0d-8a2d-ef00637ecdda", "attributes": {"id": "2720b666-b528-4f0d-8a2d-ef00637ecdda", "children": [{"type": "Slider", "id": "f04695fa-6f67-4cf0-b407-f85914382bf2"}, {"type": "Plot", "id": "e36bd246-d87d-4f91-b03c-e83c8f8e4028", "subtype": "Figure"}], "doc": null, "tags": []}}];
        Bokeh.load_models(all_models);
        var model = Bokeh.Collections(modeltype).get(modelid);
        var view = new model.default_view({model: model, el: '#7cc2bbe7-dc2b-4d93-894b-3bf2501bcb6f'});
        Bokeh.index[modelid] = view
    });
