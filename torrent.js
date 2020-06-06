// Arguments
console.log('Total arguments:', process.argv.length)
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val)
})

const TorrentSearchApi = require('torrent-search-api')

//TorrentSearchApi.enablePublicProviders()
TorrentSearchApi.enableProvider('1337x')

async function search(text, category) {
    // Available categories: ['All', 'Movies', 'TV', 'Music', 'Apps', 'Books', 'Top100']
    console.log('Searching for', text, 'in', category + '...')
    const torrents = await TorrentSearchApi.search(text, category, 20)
    // List all torrents
    console.log('Torrents found', torrents.length)
    torrents.forEach(function (val, index, array) {
        console.log(index + ': ' + JSON.stringify(val, null, 2))
    })
}

async function getTorrent(text, category, index) {
    // Available categories: ['All', 'Movies', 'TV', 'Music', 'Apps', 'Books', 'Top100']
    console.log('Getting', index,'of', text, 'in', category, '...')
    const torrents = await TorrentSearchApi.search(text, category, index+1)
    const torrent = torrents[index]
    console.log(torrent)
    const magnet = await TorrentSearchApi.getMagnet(torrent)
    console.log(magnet)
}

const category = process.argv[2].toUpperCase()
const text = process.argv[3]
const index = parseInt(process.argv[4])

if (process.argv.length == 4) {
    search(text, category)
}
else if (process.argv.length == 5) {
    getTorrent(text, category, index)
}
else {
    console.log('Missing category, text and/or index arguments')
    process.exit()
}