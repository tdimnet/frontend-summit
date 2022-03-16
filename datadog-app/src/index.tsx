const init = async () => {
    switch (window.location.pathname) {
        case '/hello-world-widget': {
            let widget = await import('./widget/HelloWorld');
            return widget.default();
        }
        case '/geo-map-widget': {
            let widget = await import('./widget/GeoMap');
            return widget.default();
        }
        default: {
            let controller = await import('./controller');
            return controller.default();
        }
    }
};

init();
export {};
