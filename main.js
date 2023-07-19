const apiManager = new APIManager()
const renderer = new Renderer()

function refresh () {
    apiManager.refresh()
        .then(() => renderer.refresh(apiManager.data))
}

$('button'). click(function () {
    refresh()
})

refresh()