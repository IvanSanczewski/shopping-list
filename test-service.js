import { getAllLists, getListById } from './db/shopping-service.js';

// Simple test to verify our service layer works
async function testService() {
  try {
    console.log('🧪 Testing getAllLists...');
    const allLists = await getAllLists();
    console.log('✅ Found', allLists.length, 'lists');
    console.log('📋 First list:', allLists[0]);
    
    console.log('\n🧪 Testing getListById...');
    const singleList = await getListById('45_24');
    console.log('✅ Found list:', singleList.title);
    console.log('🛒 Cart items:', singleList.cart.length);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testService();
