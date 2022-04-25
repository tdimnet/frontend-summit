const init = async () => {
    switch (window.location.pathname) {
        case '/hello-summit-widget': {
            let widget = await import('./widget/HelloSummit');
            return widget.default();
        }
        case '/geomap-widget': {
            let widget = await import('./widget/GeoMap');
            return widget.default();
        }
        case '/custom-timeseries-widget': {
            let widget = await import('./widget/CustomTimeseries');
            return widget.default();
        }
        case '/webgl-globe-widget': {
            let widget = await import('./widget/WebGLGlobe')
            return widget.default()
        }
        default: {
            let controller = await import('./controller');
            return controller.default();
        }
    }
};

init();
export {};
