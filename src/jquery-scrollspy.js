/**
 * jQuery ScrollSpy
 * Copyright © 20189, Alexander Griffioen <mail@oscaralexander.com>
 * Published under MIT license.
 */

const pluginName = 'scrollSpy'

class ScrollSpy {
    constructor(el, options) {
        this.options = $.extend({}, this.defaults, options)
        this.$el = $(el)
        this.init()
    }

    init() {
        this.directionX = 0
        this.directionY = 0
        this.x = 0
        this.y = 0
        this.update()
    }

    update() {
        const x = window.scrollX
        const y = window.scrollY
        const directionX = (x > this.x) ? 1 : ((x < this.y) ? -1 : 0)
        const directionY = (y > this.y) ? 1 : ((y < this.y) ? -1 : 0)

        if (directionX !== this.directionX || directionY !== this.directionY) {
            this.$el.trigger({
                directionX: directionX,
                directionY: directionY,
                x: x,
                y: y,
                type: this.options.eventNameDirectionChange
            })
        }

        if (x !== this.x || y !== this.y) {
            this.$el.trigger({
                directionX: directionX,
                directionY: directionY,
                x: x,
                y: y,
                type: this.options.eventNameScroll
            })
        }

        this.directionX = directionX
        this.directionY = directionY
        this.x = x
        this.y = y

        window.requestAnimationFrame(this.update.bind(this))
    }
}

ScrollSpy.prototype.defaults = {
    eventNameDirectionChange: 'scrollSpy:directionChange',
    eventNameScroll: 'scrollSpy:scroll'
}

$.fn[pluginName] = function(options) {
    return this.each((i, el) => {
        const instance = $(el).data(`plugin_${pluginName}`) || null

        if (!instance) {
            $(el).data(`plugin_${pluginName}`, new ScrollSpy(el, options))
        } else {
            if (typeof options === 'string') {
                instance[options]()
            }
        }
    })
}