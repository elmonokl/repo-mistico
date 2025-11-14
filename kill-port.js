/**
 * Script para encontrar y matar procesos que usan un puerto específico
 * Uso: node kill-port.js [puerto]
 * Ejemplo: node kill-port.js 3000
 */

const { exec } = require('child_process');
const port = process.argv[2] || '3000';

console.log(`🔍 Buscando procesos en el puerto ${port}...\n`);

// Windows
if (process.platform === 'win32') {
    exec(`netstat -ano | findstr :${port}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`✅ No se encontraron procesos usando el puerto ${port}`);
            return;
        }
        
        if (stdout) {
            const lines = stdout.trim().split('\n');
            const pids = new Set();
            
            lines.forEach(line => {
                const parts = line.trim().split(/\s+/);
                const pid = parts[parts.length - 1];
                if (pid && pid !== '0' && pid !== 'PID') {
                    pids.add(pid);
                }
            });
            
            if (pids.size > 0) {
                console.log(`⚠️  Procesos encontrados usando el puerto ${port}:`);
                pids.forEach(pid => {
                    console.log(`   PID: ${pid}`);
                });
                console.log(`\n💡 Para matar estos procesos, ejecuta:`);
                pids.forEach(pid => {
                    console.log(`   taskkill /PID ${pid} /F`);
                });
            } else {
                console.log(`✅ No se encontraron procesos usando el puerto ${port}`);
            }
        } else {
            console.log(`✅ No se encontraron procesos usando el puerto ${port}`);
        }
    });
} else {
    // Linux/Mac
    exec(`lsof -ti:${port}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`✅ No se encontraron procesos usando el puerto ${port}`);
            return;
        }
        
        if (stdout) {
            const pids = stdout.trim().split('\n').filter(pid => pid);
            console.log(`⚠️  Procesos encontrados usando el puerto ${port}:`);
            pids.forEach(pid => {
                console.log(`   PID: ${pid}`);
            });
            console.log(`\n💡 Para matar estos procesos, ejecuta:`);
            console.log(`   kill -9 ${pids.join(' ')}`);
        } else {
            console.log(`✅ No se encontraron procesos usando el puerto ${port}`);
        }
    });
}

