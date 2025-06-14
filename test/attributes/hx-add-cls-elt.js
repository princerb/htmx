describe('hx-add-cls-elt and hx-add-cls attributes', function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create()
    clearWorkArea()
  })
  afterEach(function() {
    this.server.restore()
    clearWorkArea()
  })

  it('single element can have classes added w/ hx-add-cls-elt', function() {
    this.server.respondWith('GET', '/test', 'Clicked!')
    var btn = make('<button hx-get="/test" hx-add-cls-elt="this" hx-add-cls="disabled bg-black">Click Me!</button>')
    btn.classList.contains('disabled').should.equal(false)
    btn.classList.contains('bg-black').should.equal(false)
    btn.click()
    btn.classList.contains('disabled').should.equal(true)
    btn.classList.contains('bg-black').should.equal(true)
    this.server.respond()
    btn.classList.contains('disabled').should.equal(false)
    btn.classList.contains('bg-black').should.equal(false)
  })

  it('single element can have classes added w/ data-hx-add-cls-elt', function() {
    this.server.respondWith('GET', '/test', 'Clicked!')
    var btn = make('<button hx-get="/test" data-hx-add-cls-elt="this" hx-add-cls="disabled bg-black">Click Me!</button>')
    btn.classList.contains('disabled').should.equal(false)
    btn.classList.contains('bg-black').should.equal(false)
    btn.click()
    btn.classList.contains('disabled').should.equal(true)
    btn.classList.contains('bg-black').should.equal(true)
    this.server.respond()
    btn.classList.contains('disabled').should.equal(false)
    btn.classList.contains('bg-black').should.equal(false)
  })

  it('single element can have classes added w/ closest syntax', function() {
    this.server.respondWith('GET', '/test', 'Clicked!')
    var fieldset = make('<fieldset><button id="b1" hx-get="/test" hx-add-cls-elt="closest fieldset" hx-add-cls="disabled bg-black">Click Me!</button></fieldset>')
    var btn = byId('b1')
    fieldset.classList.contains('disabled').should.equal(false)
    fieldset.classList.contains('bg-black').should.equal(false)
    btn.click()
    fieldset.classList.contains('disabled').should.equal(true)
    fieldset.classList.contains('bg-black').should.equal(true)
    this.server.respond()
    fieldset.classList.contains('disabled').should.equal(false)
    fieldset.classList.contains('bg-black').should.equal(false)
  })

  it('multiple requests with same class elt are handled properly', function() {
    this.server.respondWith('GET', '/test', 'Clicked!')
    var b1 = make('<button hx-get="/test" hx-add-cls-elt="#b3" hx-add-cls="disabled bg-black">Click Me!</button>')
    var b2 = make('<button hx-get="/test" hx-add-cls-elt="#b3" hx-add-cls="disabled bg-black">Click Me!</button>')
    var b3 = make('<button id="b3">Demo</button>')
    b3.classList.contains('disabled').should.equal(false)
    b3.classList.contains('bg-black').should.equal(false)

    b1.click()
    b3.classList.contains('disabled').should.equal(true)
    b3.classList.contains('bg-black').should.equal(true)

    b2.click()
    b3.classList.contains('disabled').should.equal(true)
    b3.classList.contains('bg-black').should.equal(true)

    // hack to make sinon process only one response
    this.server.processRequest(this.server.queue.shift())

    b3.classList.contains('disabled').should.equal(true)
    b3.classList.contains('bg-black').should.equal(true)

    this.server.respond()

    b3.classList.contains('disabled').should.equal(false)
    b3.classList.contains('bg-black').should.equal(false)
  })

  it('multiple elts can have classes added', function() {
    this.server.respondWith('GET', '/test', 'Clicked!')
    var b1 = make('<button hx-get="/test" hx-add-cls-elt="#b2, #b3" hx-add-cls="disabled bg-black">Click Me!</button>')
    var b2 = make('<button id="b2">Click Me!</button>')
    var b3 = make('<button id="b3">Demo</button>')

    b2.classList.contains('disabled').should.equal(false)
    b2.classList.contains('bg-black').should.equal(false)
    b3.classList.contains('disabled').should.equal(false)
    b3.classList.contains('bg-black').should.equal(false)

    b1.click()
    b2.classList.contains('disabled').should.equal(true)
    b2.classList.contains('bg-black').should.equal(true)
    b3.classList.contains('disabled').should.equal(true)
    b3.classList.contains('bg-black').should.equal(true)

    this.server.respond()

    b2.classList.contains('disabled').should.equal(false)
    b2.classList.contains('bg-black').should.equal(false)
    b3.classList.contains('disabled').should.equal(false)
    b3.classList.contains('bg-black').should.equal(false)
  })

  it('load trigger does not prevent class addition', function() {
    this.server.respondWith('GET', '/test', 'Loaded!')
    var div1 = make('<div id="d1" hx-get="/test" hx-add-cls-elt="#b1" hx-add-cls="disabled bg-black" hx-trigger="load">Load Me!</div><button id="b1">Demo</button>')
    var div = byId('d1')
    var btn = byId('b1')
    div.innerHTML.should.equal('Load Me!')
    btn.classList.contains('disabled').should.equal(true)
    btn.classList.contains('bg-black').should.equal(true)
    this.server.respond()
    div.innerHTML.should.equal('Loaded!')
    btn.classList.contains('disabled').should.equal(false)
    btn.classList.contains('bg-black').should.equal(false)
  })

  it('hx-add-cls-elt supports multiple extended selectors', function() {
    this.server.respondWith('GET', '/test', 'Clicked!')
    var form = make('<form hx-get="/test" hx-add-cls-elt="find input[type=\'text\'], find button" hx-add-cls="disabled bg-black" hx-swap="none"><input id="i1" type="text" placeholder="Type here..."><button id="b2" type="submit">Send</button></form>')
    var i1 = byId('i1')
    var b2 = byId('b2')

    i1.classList.contains('disabled').should.equal(false)
    i1.classList.contains('bg-black').should.equal(false)
    b2.classList.contains('disabled').should.equal(false)
    b2.classList.contains('bg-black').should.equal(false)

    b2.click()
    i1.classList.contains('disabled').should.equal(true)
    i1.classList.contains('bg-black').should.equal(true)
    b2.classList.contains('disabled').should.equal(true)
    b2.classList.contains('bg-black').should.equal(true)

    this.server.respond()

    i1.classList.contains('disabled').should.equal(false)
    i1.classList.contains('bg-black').should.equal(false)
    b2.classList.contains('disabled').should.equal(false)
    b2.classList.contains('bg-black').should.equal(false)
  })

  it('closest/find/next/previous handle nothing to find without exception', function() {
    this.server.respondWith('GET', '/test', 'Clicked!')
    var btn1 = make('<button hx-get="/test" hx-add-cls-elt="closest input" hx-add-cls="disabled bg-black">Click Me!</button>')
    var btn2 = make('<button hx-get="/test" hx-add-cls-elt="find input" hx-add-cls="disabled bg-black">Click Me!</button>')
    var btn3 = make('<button hx-get="/test" hx-add-cls-elt="next input" hx-add-cls="disabled bg-black">Click Me!</button>')
    var btn4 = make('<button hx-get="/test" hx-add-cls-elt="previous input" hx-add-cls="disabled bg-black">Click Me!</button>')
    btn1.click()
    btn1.classList.contains('disabled').should.equal(false)
    btn1.classList.contains('bg-black').should.equal(false)
    this.server.respond()
    btn2.click()
    btn2.classList.contains('disabled').should.equal(false)
    btn2.classList.contains('bg-black').should.equal(false)
    this.server.respond()
    btn3.click()
    btn3.classList.contains('disabled').should.equal(false)
    btn3.classList.contains('bg-black').should.equal(false)
    this.server.respond()
    btn4.click()
    btn4.classList.contains('disabled').should.equal(false)
    btn4.classList.contains('bg-black').should.equal(false)
    this.server.respond()
  })
})
