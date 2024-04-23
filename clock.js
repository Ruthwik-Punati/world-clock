const clock = document.querySelector('.clock')
const secHand = document.querySelector('.sec')
const minHand = document.querySelector('.min')
const hrsHand = document.querySelector('.hrs')
const AM__PM = document.querySelector('.AM__PM')
const select = document.querySelector('.select')
const numericTime = document.querySelector('.numeric_time')

// for notifications
let res

let reg

let notification

export let notificationsNotPreffered = false

let nmin = 0

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register('sw.js')
  return registration
}

// /////////////////////

select.addEventListener('change', function () {
  if (this.value === 'India') {
    timeZone = indianTime
  }
  if (this.value === 'Sweden') {
    timeZone = swedenTime
  }
  if (this.value === 'NewYork') {
    timeZone = newYorkTime
  }
  if (this.value === 'London') {
    timeZone = londonTime
  }
  if (this.value === 'Australia') {
    timeZone = australiaTime
  }
  if (this.value === 'Germany') {
    timeZone = germanyTime
  }
  if (this.value === 'Saudi') {
    timeZone = saudiTime
  }
  if (this.value === 'Dubai') {
    timeZone = dubaiTime
  }
  worldClock()
})

let html = 0
for (let i = 1; i < 13; i++) {
  html = `<span class="__${i}">${i}<span>`

  clock.insertAdjacentHTML('beforeend', html)
}

const indianTime = function () {
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
    })
  )
}
const swedenTime = function () {
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Stockholm',
    })
  )
}

const newYorkTime = function () {
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
    })
  )
}

const londonTime = function () {
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Europe/London',
    })
  )
}

const australiaTime = function () {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' })
  )
}

const germanyTime = function () {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' })
  )
}

const saudiTime = function () {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Riyadh' })
  )
}
const dubaiTime = function () {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })
  )
}

const timeZonesArray = [
  indianTime,
  swedenTime,
  // newYorkTime,
  // londonTime,
  // australiaTime,
  // germanyTime,
  // saudiTime,
  // dubaiTime,
]

let timeZone = timeZonesArray[0]

clock.addEventListener('click', function () {
  timeZone =
    timeZonesArray[
      timeZonesArray.indexOf(timeZone) === timeZonesArray.length - 1
        ? 0
        : timeZonesArray.indexOf(timeZone) + 1
    ]

  if (timeZone === newYorkTime) {
    select.value = 'NewYork'
  }

  if (timeZone === swedenTime) {
    select.value = 'Sweden'
  }

  if (timeZone === indianTime) {
    select.value = 'India'
  }

  if (timeZone === londonTime) {
    select.value = 'London'
  }

  if (timeZone === australiaTime) {
    select.value = 'Australia'
  }
  if (timeZone === germanyTime) {
    select.value = 'Germany'
  }
  if (timeZone === saudiTime) {
    select.value = 'Saudi'
  }
  if (timeZone === dubaiTime) {
    select.value = 'Dubai'
  }

  worldClock()
})

worldClock()

async function worldClock() {
  const sec = timeZone().getSeconds()
  const min = timeZone().getMinutes()
  const hrs = timeZone().getHours()

  function covertHours() {
    if (hrs == 0) {
      return `${12}`
    } else if (hrs > 12) {
      return `${hrs - 12}`.padStart(2, '0')
    } else if (hrs <= 12) {
      return `${hrs}`.padStart(2, '0')
    }
  }

  const digitalTime = `${
    covertHours()
    // hrs > 12 ? `${hrs - 12}`.padStart(2, '0') : `${hrs}`.padStart(2, '0')
  } : ${`${min}`.padStart(2, '0')}  &nbsp  ${`${
    hrs < 12 ? 'AM' : 'PM'
  }`.padStart(4, ' ')}`

  numericTime.innerHTML = digitalTime

  secHand.style.transform = `rotate(${sec * 6}deg)`

  minHand.style.transform = `rotate(${min * 6}deg)`

  hrsHand.style.transform = `rotate(${hrs * 30 + min / 2}deg)`

  const text = `${select.value} time is  ${digitalTime
    .replace('&nbsp', '')
    .replace('    ', '')}`

  // notifications part

  res || (res = await Notification.requestPermission())

  res === 'granted' && !reg && (reg = await registerSW())

  if (reg && !notificationsNotPreffered && nmin !== min) {
    notification = reg?.showNotification('Melvault Clock', {
      body: text,
      icon: 'icon.png',
      tag: 'time',
    })

    nmin = min
  }

  // reg &&
  //   reg.getNotifications().then(function (notifications) {
  //     notifications.forEach((notification) => {
  //       notification.onClose = function (e) {
  //         e.preventDefault()
  //         Notification.permission = 'denied'
  //         reg = false
  //         console.log('cancelled')
  //         notificationsNotPreffered = true
  // reg?.getNotifications().then(function (notifications) {
  //   notifications.forEach((notification) => notification.close())
  // })
  //     }
  //   })
  // })

  // //////////////////////////////
}

setInterval(function () {
  worldClock()
}, 1000)

window.addEventListener('beforeunload', function (e) {
  e.preventDefault()

  reg?.getNotifications().then(function (notifications) {
    console.log(notifications)
    notifications.forEach((notification) => notification.close())
  })
})

//////////////////////////////////////////////////////////
