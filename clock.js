const clock = document.querySelector('.clock')
const secHand = document.querySelector('.sec')
const minHand = document.querySelector('.min')
const hrsHand = document.querySelector('.hrs')
const AM__PM = document.querySelector('.AM__PM')
const select = document.querySelector('.select')
const numericTime = document.querySelector('.numeric_time')

const res = await Notification.requestPermission()

let notification

let nmin

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
  new Notification('Melvault Clock', {
    body: 'hello!',

    icon: 'icon.png',
    tag: 'time',
  })

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

function worldClock() {
  const sec = timeZone().getSeconds()
  const min = timeZone().getMinutes()
  const hrs = timeZone().getHours()

  const digitalTime = `${
    hrs > 12 ? `${hrs - 12}`.padStart(2, '0') : `${hrs}`.padStart(2, '0')
  } : ${`${min}`.padStart(2, '0')}  &nbsp  ${`${
    hrs <= 12 ? 'AM' : 'PM'
  }`.padStart(4, ' ')}`

  numericTime.innerHTML = digitalTime

  // if (hrs <= 12) {
  //   AM__PM.textContent = "AM";
  // } else {
  //   AM__PM.textContent = "PM";
  // }

  secHand.style.transform = `rotate(${sec * 6}deg)`

  minHand.style.transform = `rotate(${min * 6}deg)`

  hrsHand.style.transform = `rotate(${hrs * 30 + min / 2}deg)`

  const text = `${select.value} time is  ${digitalTime
    .replace('&nbsp', '')
    .replace('    ', '')}`

  console.log(sec, min)

  res === 'granted' &&
    nmin !== min &&
    (notification = new Notification('Melvault Clock', {
      body: text,

      icon: 'icon.png',
      tag: 'time',
    })) &&
    (nmin = min)
}

setInterval(function () {
  worldClock()
}, 1000)

window.addEventListener('beforeunload', function (e) {
  notification?.close()
})
