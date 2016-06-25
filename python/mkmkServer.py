import paho.mqtt.client as paho
from AppKit import NSApplication, NSApp
from Foundation import NSObject, NSLog
from Cocoa import NSEvent, NSKeyDownMask, NSKeyDown
from PyObjCTools import AppHelper
import keycode
import string
import sys

class AppDelegate(NSObject):
    def applicationDidFinishLaunching_(self, notification):
        NSEvent.addGlobalMonitorForEventsMatchingMask_handler_(NSKeyDownMask, handler)

def handler(event):
    try:
        if event.type() == NSKeyDown and keycode.tostring(event.keyCode()) in string.printable:
            key = keycode.tostring(event.keyCode())
            print 'key:',key
            if key == '=':
                sys.exit()
            elif key == 'x':
                client.reconnect()
                out = client.publish('PLANET','radamar:mercury')
            elif key == 'c':
                client.reconnect()
                out = client.publish('PLANET','radamar:venus')
            elif key == 'v':
                client.reconnect()
                out = client.publish('PLANET','radamar:earth')
            elif key == 'b':
                client.reconnect()
                out = client.publish('PLANET','radamar:mars')
            elif key == 'n':
                client.reconnect()
                out = client.publish('PLANET','radamar:jupiter')
            elif key == 'm':
                client.reconnect()
                out = client.publish('PLANET','radamar:saturn')

    except SystemExit:
        AppHelper.stopEventLoop()

def main():
    app = NSApplication.sharedApplication()
    delegate = AppDelegate.alloc().init()
    NSApp().setDelegate_(delegate)
    AppHelper.runEventLoop()

if __name__ == '__main__':
    client = paho.Client()
    client.connect("localhost", 1883, 60)
    main()
