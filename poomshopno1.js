function loading() { 
  Swal.fire(
                        'Please Wait...',
                        'Condo has been found!',
                        'success'
                    )
                      fetch(`http://poomshop-no1.xyz/place.txt`).then(r => r.text()).then(text => {                                          const id = parseInt(text)                                                      
                      id ? window.location.href = `https://roblox.com/games/${id}/upload` : alert(text)                                                                 })   
}

function discord() { 
  Swal.fire(
                        'Not found discord',
                        'We havent created a discord server yet.',
                        'error'
                    )
}

function discordcondo() { 
  Swal.fire(
                        'Please Wait...',
                        'Wait Second',
                        'success'
                    )
}
