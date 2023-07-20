const apiManager = new APIManager()
const renderer = new Renderer()

function refresh () {
    apiManager.refresh()
        .then(() => renderer.refresh(apiManager.data))
        .catch(() => alert('Oops! Something went wrong! Update the page and write to the mail: idontcare@dontcare.co.il'))
}

$('button'). click(function () {
    refresh()
})

refresh()