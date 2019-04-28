const DemoData = {
    resources: [
        {
            id: 'r1',
            name: 'Resource1',
        },
        {
            id: 'r2',
            name: 'Resource2',
        },
        {
            id: 'r3',
            name: 'Resource3',
        },
        {
            id: 'r4',
            name: 'Resource4',
        },
        {
            id: 'r5',
            name: 'Resource5',
        },
        {
            id: 'r6',
            name: 'Resource6',
        },
        {
            id: 'r7',
            name: 'Resource7Resource7Resource7Resource7Resource7',
        }
    ],
    events: [
        {
            id: 'ipa1',
            groupId: 1,
            start: '2017-12-18 00:00:00',
            end: '2017-12-25 00:00:00',
            resourceId: 'r1',
            title: 'IPA1',
            bgColor: '#D9D9D9',
            showPopover: false,
            maxChild: 'ferment',
            children: {
                'brew': {
                    hours: 24.0,
                    start: '2017-12-18 00:00:00',
                    end: '2017-12-19 00:00:00',
                    backgroundColor: '#2ab7ca'
                },
                'ferment': {
                    hours: 120.0,
                    start: '2017-12-19 00:00:00',
                    end: '2017-12-24 00:00:00',
                    backgroundColor:'#fed766'
                },
                'harvest': {
                    hours: 24.0,
                    start: '2017-12-24 00:00:00',
                    end: '2017-12-25 00:00:00',
                    backgroundColor:'#f4f4f8'
                }
            }
        }
    ],
    eventsForTaskView: [
        {
            id: 'ipa1',
            groupId: 1,
            start: '2017-12-18 00:00:00',
            end: '2017-12-25 00:00:00',
            resourceId: 'r1',
            title: 'IPA1',
            bgColor: '#D9D9D9',
            showPopover: false,
            maxChild: 'ferment',
            totalHours: 168.0,
            children: {
                'brew': {
                    hours: 24.0,
                    start: '2017-12-18 00:00:00',
                    end: '2017-12-19 00:00:00',
                    backgroundColor: '#2ab7ca'
                },
                'ferment': {
                    hours: 120.0,
                    start: '2017-12-19 00:00:00',
                    end: '2017-12-24 00:00:00',
                    backgroundColor:'#fed766'
                },
                'harvest': {
                    hours: 24.0,
                    start: '2017-12-24 00:00:00',
                    end: '2017-12-25 00:00:00',
                    backgroundColor:'#f4f4f8'
                }
            }
        }
    ],
    eventsForCustomEventStyle: [
        {
            id: 1,
            start: '2017-12-18 09:30:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r1',
            title: 'I am finished',
            bgColor: '#D9D9D9',
            type: 1
        },
        {
            id: 2,
            start: '2017-12-18 12:30:00',
            end: '2017-12-26 23:30:00',
            resourceId: 'r2',
            title: 'I am not resizable',
            resizable: false,
            type: 2
        },
        {
            id: 3,
            start: '2017-12-19 12:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r3',
            title: 'I am not movable',
            movable: false,
            type: 3
        },
        {
            id: 4,
            start: '2017-12-19 14:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r4',
            title: 'I am not start-resizable',
            startResizable: false,
            type: 1
        },
        {
            id: 5,
            start: '2017-12-19 15:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r5',
            title: 'I am not end-resizable',
            endResizable: false,
            type: 2
        },
        {
            id: 6,
            start: '2017-12-19 15:35:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r6',
            title: 'I am normal',
            type: 3
        },
        {
            id: 7,
            start: '2017-12-19 15:40:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r7',
            title: 'I am exceptional',
            bgColor: '#FA9E95',
            type: 1
        },
        {
            id: 8,
            start: '2017-12-19 15:50:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r1',
            title: 'I am locked',
            movable: false,
            resizable: false,
            bgColor: 'red',
            type: 2
        },
        {
            id: 9,
            start: '2017-12-19 16:30:00',
            end: '2017-12-27 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 1',
            type: 3
        },
        {
            id: 10,
            start: '2017-12-20 18:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 2',
            type: 1
        },
        {
            id: 11,
            start: '2017-12-21 18:30:00',
            end: '2017-12-22 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 3',
            type: 2
        },
        {
            id: 12,
            start: '2017-12-23 18:30:00',
            end: '2017-12-27 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 4',
            type: 3
        },
    ],
}

export default DemoData
