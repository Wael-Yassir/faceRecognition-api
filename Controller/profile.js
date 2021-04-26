const handleProfile = (req, res, postgres) => {
    const { id } = req.params;

    postgres.select('*').from('users').where({ id })
        .then(user => {
            // in js if the array is empty user.lenght => false.
            if (user.length)
                res.json(user[0])
            else
                res.json('Not Found!')
        })
        .catch(() => res.status(400).json('Error getting user!'))
}

module.exports = {
    handleProfile: handleProfile
}