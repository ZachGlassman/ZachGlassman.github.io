    Bokeh.$(function() {
        var modelid = "1beb3c14-832d-4dbc-b464-5ef9df974bd8";
        var modeltype = "VBoxForm";
        var elementid = "17d2cbeb-5f32-4f5b-b626-29ad385fc246";
        Bokeh.logger.info("Realizing plot:")
        Bokeh.logger.info(" - modeltype: VBoxForm");
        Bokeh.logger.info(" - modelid: 1beb3c14-832d-4dbc-b464-5ef9df974bd8");
        Bokeh.logger.info(" - elementid: 17d2cbeb-5f32-4f5b-b626-29ad385fc246");
        var all_models = [{"attributes": {"children": [{"id": "2c431ba8-1afc-4514-941a-19e4939b7bc1", "type": "Slider"}, {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}], "id": "1beb3c14-832d-4dbc-b464-5ef9df974bd8", "doc": null, "tags": []}, "id": "1beb3c14-832d-4dbc-b464-5ef9df974bd8", "type": "VBoxForm"}, {"attributes": {"id": "eb633b04-1de7-4b54-b87e-f53839ad68ce", "start": -5, "doc": null, "end": 5, "tags": []}, "id": "eb633b04-1de7-4b54-b87e-f53839ad68ce", "type": "Range1d"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "axis_label": "y", "id": "aa8a4f92-47b2-4eab-8e88-2d93f5de57a3", "formatter": {"id": "a898019a-8942-4fed-a330-ad333e959f2e", "type": "BasicTickFormatter"}, "doc": null, "tags": [], "ticker": {"id": "9a317c15-ec06-4b93-bc01-94377d02590d", "type": "BasicTicker"}}, "id": "aa8a4f92-47b2-4eab-8e88-2d93f5de57a3", "type": "LinearAxis"}, {"attributes": {"id": "9a317c15-ec06-4b93-bc01-94377d02590d", "num_minor_ticks": 5, "doc": null, "tags": [], "mantissas": [2, 5, 10]}, "id": "9a317c15-ec06-4b93-bc01-94377d02590d", "type": "BasicTicker"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "id": "14f9760b-3dd7-4db0-ad22-6766389b94e8", "doc": null, "tags": []}, "id": "14f9760b-3dd7-4db0-ad22-6766389b94e8", "type": "ResizeTool"}, {"attributes": {"id": "f7f5946e-4e10-4a9e-a572-fee54c08cdd1", "num_minor_ticks": 5, "doc": null, "tags": [], "mantissas": [2, 5, 10]}, "id": "f7f5946e-4e10-4a9e-a572-fee54c08cdd1", "type": "BasicTicker"}, {"attributes": {"y": {"field": "y"}, "line_width": {"value": 3}, "id": "1780c526-191a-44b8-aee3-6c9353e0abfe", "line_color": {"value": "#1f77b4"}, "doc": null, "line_alpha": {"value": 0.1}, "tags": [], "x": {"field": "x"}}, "id": "1780c526-191a-44b8-aee3-6c9353e0abfe", "type": "Line"}, {"attributes": {"column_names": ["y", "x"], "callback": null, "selected": {"1d": {"indices": []}, "0d": {"flag": false, "indices": []}, "2d": {"indices": []}}, "id": "9c584dbd-cea6-4428-bdb3-f92a1feb53b2", "data": {"y": [-100, -99, -98, -97, -96, -95, -94, -93, -92, -91, -90, -89, -88, -87, -86, -85, -84, -83, -82, -81, -80, -79, -78, -77, -76, -75, -74, -73, -72, -71, -70, -69, -68, -67, -66, -65, -64, -63, -62, -61, -60, -59, -58, -57, -56, -55, -54, -53, -52, -51, -50, -49, -48, -47, -46, -45, -44, -43, -42, -41, -40, -39, -38, -37, -36, -35, -34, -33, -32, -31, -30, -29, -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100], "x": [-100, -99, -98, -97, -96, -95, -94, -93, -92, -91, -90, -89, -88, -87, -86, -85, -84, -83, -82, -81, -80, -79, -78, -77, -76, -75, -74, -73, -72, -71, -70, -69, -68, -67, -66, -65, -64, -63, -62, -61, -60, -59, -58, -57, -56, -55, -54, -53, -52, -51, -50, -49, -48, -47, -46, -45, -44, -43, -42, -41, -40, -39, -38, -37, -36, -35, -34, -33, -32, -31, -30, -29, -28, -27, -26, -25, -24, -23, -22, -21, -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]}, "doc": null, "tags": []}, "id": "9c584dbd-cea6-4428-bdb3-f92a1feb53b2", "type": "ColumnDataSource"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "id": "38be338a-4d7e-4b16-8859-1590cb38ef81", "doc": null, "tags": [], "dimensions": ["width", "height"]}, "id": "38be338a-4d7e-4b16-8859-1590cb38ef81", "type": "PanTool"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "id": "1d43e1e8-45c1-46e3-8053-8c6004937a33", "doc": null, "tags": []}, "id": "1d43e1e8-45c1-46e3-8053-8c6004937a33", "type": "HelpTool"}, {"attributes": {"tags": [], "glyph": {"id": "1aa378e5-bf3b-447e-8f09-323c98f8a99a", "type": "Line"}, "id": "1bf25351-9b60-49e5-8fc9-8f4a5375eb9a", "doc": null, "data_source": {"id": "9c584dbd-cea6-4428-bdb3-f92a1feb53b2", "type": "ColumnDataSource"}, "selection_glyph": null, "name": null, "nonselection_glyph": {"id": "1780c526-191a-44b8-aee3-6c9353e0abfe", "type": "Line"}}, "id": "1bf25351-9b60-49e5-8fc9-8f4a5375eb9a", "type": "GlyphRenderer"}, {"attributes": {"title": "Slope", "callback": {"id": "94754b19-bac3-494b-826d-552dcd0ac3ee", "type": "Callback"}, "id": "2c431ba8-1afc-4514-941a-19e4939b7bc1", "value": 1, "start": -5, "doc": null, "end": 5, "tags": [], "step": 0.1}, "id": "2c431ba8-1afc-4514-941a-19e4939b7bc1", "type": "Slider"}, {"attributes": {"id": "94754b19-bac3-494b-826d-552dcd0ac3ee", "doc": null, "args": {"source": {"id": "9c584dbd-cea6-4428-bdb3-f92a1feb53b2", "type": "ColumnDataSource"}}, "code": "\n    var data = source.get('data');\n    var slope = cb_obj.get('value');\n    x = data['x'];\n    y = data['y'];\n    for(i = 0; i < x.length; i++){\n        y[i] = slope * x[i];\n    };\n    \n    source.trigger('change');\n", "tags": []}, "id": "94754b19-bac3-494b-826d-552dcd0ac3ee", "type": "Callback"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "id": "af317c4e-7675-4382-86eb-7eedb6e5d40d", "dimension": 1, "doc": null, "tags": [], "ticker": {"id": "9a317c15-ec06-4b93-bc01-94377d02590d", "type": "BasicTicker"}}, "id": "af317c4e-7675-4382-86eb-7eedb6e5d40d", "type": "Grid"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "id": "4738dbd9-9909-4dad-a3ab-4630c56f3001", "doc": null, "tags": []}, "id": "4738dbd9-9909-4dad-a3ab-4630c56f3001", "type": "ResetTool"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "id": "1307d84f-616e-4e38-85e1-24cdcebc103f", "doc": null, "tags": [], "dimensions": ["width", "height"]}, "id": "1307d84f-616e-4e38-85e1-24cdcebc103f", "type": "BoxZoomTool"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "id": "35c51e7c-979f-4982-88e2-103b7acfdc53", "dimension": 0, "doc": null, "tags": [], "ticker": {"id": "f7f5946e-4e10-4a9e-a572-fee54c08cdd1", "type": "BasicTicker"}}, "id": "35c51e7c-979f-4982-88e2-103b7acfdc53", "type": "Grid"}, {"attributes": {"doc": null, "tags": [], "id": "90d5d987-46e6-4ef2-871e-42ce3cfb8652"}, "id": "90d5d987-46e6-4ef2-871e-42ce3cfb8652", "type": "BasicTickFormatter"}, {"attributes": {"geometries": [], "id": "f9c75a35-8e87-4b3a-998d-aea1b2107673", "doc": null, "tags": []}, "id": "f9c75a35-8e87-4b3a-998d-aea1b2107673", "type": "ToolEvents"}, {"attributes": {"line_color": {"value": "#1f77b4"}, "line_width": {"value": 3}, "id": "1aa378e5-bf3b-447e-8f09-323c98f8a99a", "y": {"field": "y"}, "doc": null, "line_alpha": {"value": 0.5}, "tags": [], "x": {"field": "x"}}, "id": "1aa378e5-bf3b-447e-8f09-323c98f8a99a", "type": "Line"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "axis_label": "x", "id": "fd6a184c-c135-4051-9da1-5b530614a5c4", "formatter": {"id": "90d5d987-46e6-4ef2-871e-42ce3cfb8652", "type": "BasicTickFormatter"}, "doc": null, "tags": [], "ticker": {"id": "f7f5946e-4e10-4a9e-a572-fee54c08cdd1", "type": "BasicTicker"}}, "id": "fd6a184c-c135-4051-9da1-5b530614a5c4", "type": "LinearAxis"}, {"attributes": {"id": "e57bb683-518e-4c1f-a6df-6ccb9455f822", "start": -5, "doc": null, "end": 5, "tags": []}, "id": "e57bb683-518e-4c1f-a6df-6ccb9455f822", "type": "Range1d"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "id": "08b5585f-148b-4901-ae48-0b99d7cda2ec", "doc": null, "tags": [], "dimensions": ["width", "height"]}, "id": "08b5585f-148b-4901-ae48-0b99d7cda2ec", "type": "WheelZoomTool"}, {"attributes": {"doc": null, "tags": [], "id": "a898019a-8942-4fed-a330-ad333e959f2e"}, "id": "a898019a-8942-4fed-a330-ad333e959f2e", "type": "BasicTickFormatter"}, {"attributes": {"plot": {"id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}, "id": "9649f64c-4bf3-468c-8cc5-d6638cb06f04", "doc": null, "tags": []}, "id": "9649f64c-4bf3-468c-8cc5-d6638cb06f04", "type": "PreviewSaveTool"}, {"attributes": {"extra_y_ranges": {}, "tool_events": {"id": "f9c75a35-8e87-4b3a-998d-aea1b2107673", "type": "ToolEvents"}, "tools": [{"id": "38be338a-4d7e-4b16-8859-1590cb38ef81", "type": "PanTool"}, {"id": "08b5585f-148b-4901-ae48-0b99d7cda2ec", "type": "WheelZoomTool"}, {"id": "1307d84f-616e-4e38-85e1-24cdcebc103f", "type": "BoxZoomTool"}, {"id": "9649f64c-4bf3-468c-8cc5-d6638cb06f04", "type": "PreviewSaveTool"}, {"id": "14f9760b-3dd7-4db0-ad22-6766389b94e8", "type": "ResizeTool"}, {"id": "4738dbd9-9909-4dad-a3ab-4630c56f3001", "type": "ResetTool"}, {"id": "1d43e1e8-45c1-46e3-8053-8c6004937a33", "type": "HelpTool"}], "tags": [], "right": [], "plot_height": 400, "x_range": {"id": "e57bb683-518e-4c1f-a6df-6ccb9455f822", "type": "Range1d"}, "below": [{"id": "fd6a184c-c135-4051-9da1-5b530614a5c4", "type": "LinearAxis"}], "renderers": [{"id": "fd6a184c-c135-4051-9da1-5b530614a5c4", "type": "LinearAxis"}, {"id": "35c51e7c-979f-4982-88e2-103b7acfdc53", "type": "Grid"}, {"id": "aa8a4f92-47b2-4eab-8e88-2d93f5de57a3", "type": "LinearAxis"}, {"id": "af317c4e-7675-4382-86eb-7eedb6e5d40d", "type": "Grid"}, {"id": "1bf25351-9b60-49e5-8fc9-8f4a5375eb9a", "type": "GlyphRenderer"}], "title": "Line", "id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "plot_width": 750, "above": [], "y_range": {"id": "eb633b04-1de7-4b54-b87e-f53839ad68ce", "type": "Range1d"}, "toolbar_location": null, "extra_x_ranges": {}, "doc": null, "left": [{"id": "aa8a4f92-47b2-4eab-8e88-2d93f5de57a3", "type": "LinearAxis"}]}, "id": "74fd39cc-0ccb-4939-85d3-b9f1e9f12728", "type": "Plot", "subtype": "Figure"}];
        Bokeh.load_models(all_models);
        var model = Bokeh.Collections(modeltype).get(modelid);
        var view = new model.default_view({model: model, el: '#17d2cbeb-5f32-4f5b-b626-29ad385fc246'});
        Bokeh.index[modelid] = view
    });
