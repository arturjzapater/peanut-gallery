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

window.onload = () => {
    if (document.getElementById('own-review')) {
        const deleteBtn = document.getElementById('delete')
        deleteBtn.addEventListener('click', () => {
            deleteReview(deleteBtn.getAttribute('data-review'))
        })
    }

    document.getElementById('meta-toggle')
        .addEventListener('click', toggleMeta)
}
