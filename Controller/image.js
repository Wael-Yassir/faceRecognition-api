const handleImage = (req, res, postgres) => {
    const { id } = req.body;

    postgres('users')
    .increment('entries', 1)
    .where('id', '=', id)
    .returning('entries')
    .then(entries => {
        if (entries.length)
            res.json(entries[0])
        else
            res.status(400).json('The user is not exist!')
    })
    .catch(() => res.status(400).json('Error updating the entries!'));
}

module.exports = {
    handleImage: handleImage
}