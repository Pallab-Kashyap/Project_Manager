const STATUS = {
    NOT_STARTED: 'Not Started',
    IN_PROGRESS: 'In Progress',
    ON_HOLD: 'On Hold',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled'
}

const PRIORITIES = {
    LOW: 'LOW',
    MEDIUM: 'MEIDUM',
    HIGH: 'HIGH',
}

const DROP_DOWN_TYPES = {
    SORT : {
        NAME: 'NAME',
        TIME: 'TIME',
    },
    FILTER: {
        MY_PORJECTS: 'MY PROJECTS',
        PRIORITIES,
        STATUS,
    },
    PRIORITY: {},
    STATUS: {},
}

export {
    PRIORITIES,
    STATUS,
    DROP_DOWN_TYPES,
}
export default STATUS