/**
 * مدير التخزين المحلي
 */
class StorageManager {
  /**
   * حفظ البيانات
   */
  static save(key, data) {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Storage save error:', error);
      return false;
    }
  }

  /**
   * استرجاع البيانات
   */
  static load(key, defaultValue = null) {
    try {
      const serialized = localStorage.getItem(key);
      return serialized ? JSON.parse(serialized) : defaultValue;
    } catch (error) {
      console.error('Storage load error:', error);
      return defaultValue;
    }
  }

  /**
   * حذف البيانات
   */
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  /**
   * مسح الكل
   */
  static clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
}

export default StorageManager;
