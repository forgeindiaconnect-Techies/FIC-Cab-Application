const fs = require('fs');

let content = fs.readFileSync('App_metro.tsx', 'utf8');

const target1 = `              onProfilePress={onNavigateProfile}
              onNotificationPress={() => setShowNotificationScreen(true)}`;
const replacement1 = `              onProfilePress={onNavigateProfile}
              onMyBookingsPress={() => handleTabPress('trips')}
              onNotificationPress={() => setShowNotificationScreen(true)}`;

content = content.replace(target1, replacement1);

const target2 = `              onTrackRide={() => {
                if (scheduledRide.status === 'scheduled') {
                  Alert.alert('Scheduled Ride', 'Driver will be assigned 15 minutes before the pickup time.');
                } else {
                  API.get('/users/me/rides').then(res => {
                    if (res.data.success) {
                      const activeBooking = res.data.data.find((r: any) => r.scheduledRideId === scheduledRide._id && !['completed', 'cancelled'].includes(r.status));
                      if (activeBooking) {
                        onRideBooked(activeBooking);
                      } else {
                        Alert.alert('Ride Update', 'Could not find active tracking details. Please check your rides history.');
                      }
                    }
                  }).catch(() => {
                    Alert.alert('Error', 'Failed to fetch ride tracking info.');
                  });
                }
              }}`;
              
const replacement2 = `              onTrackRide={() => {
                API.get('/users/me/rides').then(res => {
                  if (res.data.success) {
                    const activeBooking = res.data.data.find((r: any) => !['completed', 'cancelled', 'payment_pending'].includes(r.status));
                    if (activeBooking) {
                      onRideBooked(activeBooking);
                    } else {
                      Alert.alert('No Active Rides', 'You have no active rides to track right now.');
                    }
                  }
                }).catch(() => {
                  Alert.alert('Error', 'Failed to fetch ride tracking info.');
                });
              }}`;

content = content.replace(target2, replacement2);

// also bypass payment
const target3 = `  if (rideStatus === 'payment_pending') {
    return (
      <CustomerQRScannerScreen 
        ride={ride} 
        onPaymentComplete={() => setRideStatus('completed')} 
        onClose={onClose} 
      />
    );
  }`;
const replacement3 = `  if (rideStatus === 'payment_pending') {
    setTimeout(() => setRideStatus('completed'), 0);
    return null;
  }`;
content = content.replace(target3, replacement3);

fs.writeFileSync('App_metro.tsx', content);
console.log('done');
