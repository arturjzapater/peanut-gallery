const deleteReview = id => fetch(`/reviews/${id}`, { method: 'DELETE' })
    .then(() => location.reload())

const toggleMeta = () => {
    const metaInfo = document.getElementById('meta-info')
    const arrow = document.getElementById('arrow')
    
    metaInfo.classList.toggle('hidden')
    if (metaInfo.classList.contains('hidden')) {
        arrow.innerHTML = '<i class="fas fa-chevron-left"></i>'
    } else {
        arrow.innerHTML = '<i class="fas fa-chevron-down"></i>'
    }
}

const vote = elem => {
    const review = elem.getAttribute('data-review')
    const action = elem.getAttribute('data-action')
    fetch(`/reviews/${review}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
    })
        .then(() => location.reload())
}

window.onload = () => {
    if (document.getElementById('own-review')) {
        const deleteBtn = document.getElementById('delete')
        deleteBtn.addEventListener('click', () => {
            deleteReview(deleteBtn.getAttribute('data-review'))
        })
    }

    document.getElementById('meta-toggle')
        .addEventListener('click', toggleMeta)

    document.querySelectorAll('.review__vote')
        .forEach(x => {
            x.addEventListener('click', () => vote(x))
        })
}
