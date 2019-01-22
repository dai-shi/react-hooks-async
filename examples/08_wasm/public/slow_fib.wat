(module
  (func $fib (param $i i32) (result i32)
    (if (result i32)
      (i32.le_s (get_local $i) (i32.const 1))
      (then (get_local $i))
      (else
        (i32.add
          (call $fib (i32.sub (get_local $i) (i32.const 1)))
          (call $fib (i32.sub (get_local $i) (i32.const 2)))))))
  (export "fib" (func $fib)))
