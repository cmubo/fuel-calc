// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_whole_whizzer.sql';
import m0001 from './0001_cynical_ben_urich.sql';
import m0002 from './0002_tricky_jack_flag.sql';
import m0003 from './0003_fair_machine_man.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003
    }
  }
  