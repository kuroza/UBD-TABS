import { bookingLecturers, bookingModules, bookingPurpose, bookingRooms } from './home.component';

var b: any;

beforeEach(() => {
    b = {
            rooms: [{ name: 'FSB' }, { name: 'APB' }],
            offerings: [{id: 1, module: {code: 'SS-1201', name: 'Programming Fundamentals 1'}}],
            purpose: 'Tutorial'
        };
});

// describe('bookingLecturers', () => {
//     it('should return the lecturer names and their title', () => {
//         expect(bookingLecturers(b).toContain())
//     })
// });

describe('bookingModules', () => {
    it('should return the module codes and names', () => {
        expect(bookingModules(b)).toContain('SS-1201');
        expect(bookingModules(b)).toContain('Programming Fundamentals 1');
    });
});

describe('bookingRooms', () => {
    it('should return the room names', () => {
        expect(bookingRooms(b)).toContain('FSB');
        expect(bookingRooms(b)).toContain('APB');
    });
});

describe('bookingPurpose', () => {
    it('should return the purpose of booking', () => {
        expect(bookingPurpose(b)).toContain('Tutorial');
    });
});
